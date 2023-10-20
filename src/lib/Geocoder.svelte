<script>
    import { Input } from "flowbite-svelte";
    import { createEventDispatcher } from "svelte";
    export let addressGeometryString;
    let isAddressFocused = false;
    let timeoutId;
    let addressSuggestions = [{ display_name: "", geometry: {} }];
    export let address = addressSuggestions[0];
    export let placeholder = "Renseignez votre addresse";

    const dispatch = createEventDispatcher();
    
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
            }
        }, 500);
    };
    const getIGNSuggestions = async (addressValue) => {
        addressSuggestions = [];
        const response = await fetch(
            `https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/search?q=${addressValue}&limit=10&returntruegeometry=false`
        );
        const data = await response.json();
        if (data)
            return data.features.map((wayFeature) => ({
                display_name: wayFeature.properties.label,
                geometry: wayFeature.geometry,
            }));
    };
</script>
<div class="relative m-auto">
<Input
    type="text"
    name="address"
    {placeholder}
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
        ? "absolute rounded bg-slate-200  text-black w-full z-[9999]"
        : "hidden"}
>
    {#each addressSuggestions as addressSuggestion}
        {#if addressSuggestion.display_name !== ""}
            <button
                class="hover:cursor-pointer hover:transition-[background-color] hover:bg-slate-400 block w-full text-left border-b border-slate-500 p-2 rounded"
                on:click={() => {
                    address = addressSuggestion;
                    addressGeometryString = JSON.stringify(
                        addressSuggestion.geometry
                    );
                    addressSuggestions = [];
                    dispatch('addressSelected')
                }}>{addressSuggestion.display_name}</button
            >
        {/if}
    {/each}
</div>
</div>