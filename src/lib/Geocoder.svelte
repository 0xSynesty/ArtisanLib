<script>
    import { Label, Input } from "flowbite-svelte";

    export let addressGeometryString;
    let isAddressFocused = false;
    let timeoutId;
    let addressSuggestions = [{ display_name: "", geometry: {} }];
    export let address = addressSuggestions[0];

    
    const handleaddress = async (e) => {
        addressGeometryString = false;
        if (e.target.value.length < 3) {
            addressSuggestions = [];
            return;
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
            if (isAddressFocused) {
                addressSuggestions = await getIGNSuggestions(e.target.value);
            } else {
                console.log('addr not focused')
            }
        }, 500);
        console.log(addressSuggestions)
    };
    const getIGNSuggestions = async (addressValue) => {
        addressSuggestions = [];
        const response = await fetch(
            `https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/search?q=${addressValue}&limit=10&returntruegeometry=false`
        );
        const data = await response.json();
        console.log(data)
        if (data)
            return data.features.map((wayFeature) => ({
                display_name: wayFeature.properties.label,
                geometry: wayFeature.geometry,
            }));
    };
</script>

<Label for="address" class="mb-2 w-full">Addresse</Label>
<Input
    type="text"
    name="address"
    placeholder="Renseignez votre addresse (pas besoin d'être très précis)"
    bind:value={address.display_name}
    on:keydown={handleaddress}
    on:focus={() => (isAddressFocused = true)}
    autocomplete="off"
    required
/>
<input
    type="hidden"
    name="address-geometry"
    bind:value={addressGeometryString}
/>
<div
    class={isAddressFocused && addressSuggestions.length
        ? "absolute rounded bg-slate-200  text-black w-full"
        : "hidden"}
>
    {#each addressSuggestions as addressSuggestion}
        {#if addressSuggestion.display_name !== ""}
            <button
                class="hover:cursor-pointer hover:transition-[background-color] hover:bg-slate-400 block w-full text-left border-b border-slate-500 p-2 rounded"
                on:click|stopPropagation={() => {
                    address = addressSuggestion;
                    addressGeometryString = JSON.stringify(
                        addressSuggestion.geometry
                    );
                    addressSuggestions = [];
                }}>{addressSuggestion.display_name}</button
            >
        {/if}
    {/each}
</div>
