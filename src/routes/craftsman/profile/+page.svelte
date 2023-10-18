<script>
    import { Section } from "flowbite-svelte-blocks";
    import { enhance } from "$app/forms";
    import { CheckCircleSolid } from "flowbite-svelte-icons";
    import { page } from '$app/stores'
    
    import { Label, Input, Button, Select, Textarea, Toast } from "flowbite-svelte";
    export let data;
    let selected_prof;
    const professions = [
        { value: "serrurier", name: "Serrurier" },
        { value: "artisan_polyvalent", name: "Artisan polyvalent" },
        { value: "electricien", name: "Electricien" },
        { value: "plombier", name: "Plombier" },
    ];
    let addressSuggestions = [];
    let address = addressSuggestions[0];
    let addressGeometryString;
    let isaddressFocused = false;

    let timeoutId;
    const handleaddress = async (e) => {
        if (e.target.value.length < 3) {
            addressSuggestions = [];
            return;
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
            if (isaddressFocused) {
                addressSuggestions = await getNominatimSuggestions(
                    e.target.value
                );
            }
        }, 500);
    };

    const getNominatimSuggestions = async (addressValue) => {
        addressSuggestions = [];
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${addressValue}&format=geojson&layer=address&addressdetails=0&countrycodes=fr`
        );
        const data = await response.json();
        return data.features
            .filter((feature) => feature.properties.osm_type === "way")
            .map((wayFeature) => ({
                display_name: wayFeature.properties.display_name,
                geometry: wayFeature.geometry,
            }));
    };

    if (data) {
        selected_prof = data.details.profession;
        address = {
            display_name: data.details.address,
            geometry: JSON.parse(data.details.address_geometry),
        };
        addressGeometryString = data.details.address_geometry;
    } else {
        console.log("no data");
    }

    $: detailsUpdateConfirmation = ($page.url.searchParams.get('updated') === "True")
</script>
{#if detailsUpdateConfirmation}
<div class="flex justify-center text-center mb-6">
    <Toast color="green" divClass="w-auto border-green-400 border p-4" contentClass="mr-4">
        <CheckCircleSolid slot="icon"/>
        <span class="ml-2">Votre profil a bien été mis à jour</span>
    </Toast>
</div>
{/if}
<!-- <Section name="crudcreateform" sectionClass="p-0 relative" divClass="p-0"> -->
    <div class="relative">
    <h1 class="mb-4 text-xl font-bold">Mon profil Artisan</h1>

    <form method="POST" use:enhance>
        <div class="grid gap-4 sm:gap-6">
            <div class="w-full">
                <Label for="lastname" class="mb-2">Nom</Label>
                <Input
                    type="text"
                    name="lastname"
                    placeholder="Votre prénom"
                    value={data?.details.lastname}
                    required
                />
            </div>
            <div>
                <Label for="firstname" class="mb-2">Prénom</Label>
                <Input
                    type="text"
                    name="firstname"
                    placeholder="Votre nom"
                    value={data?.details.firstname}
                    required
                />
            </div>
            <div>
                <Label for="profession" class="mb-2">Profession</Label>
                <Select
                    items={professions}
                    bind:value={selected_prof}
                    name="profession"
                    placeholder="-- Profession exercée --"
                    required
                />
            </div>
            <div>
                <Label for="siret" class="mb-2">Numéro SIRET</Label>
                <Input
                    type="text"
                    name="siret"
                    placeholder=""
                    required
                    value={data?.details.siret}
                />
            </div>
            <div class="col-span-2">
                <Label for="address" class="mb-2 w-full">Addresse</Label>
                <Input
                    type="text"
                    name="address"
                    placeholder=""
                    bind:value={address.display_name}
                    on:keydown={handleaddress}
                    on:focus={() => (isaddressFocused = true)}
                    autocomplete="off"
                    required
                />
                <input
                    type="hidden"
                    name="address-geometry"
                    bind:value={addressGeometryString}
                />
                <div
                    class={isaddressFocused && addressSuggestions.length
                        ? "absolute rounded bg-slate-200  text-black w-full"
                        : "hidden"}
                >
                    {#each addressSuggestions as addressSuggestion}
                        <button
                            class="hover:cursor-pointer hover:transition-[background-color] hover:bg-slate-400 block w-full  text-left border-b border-slate-500 p-2 rounded"
                            on:click|stopPropagation={() => {
                                address = addressSuggestion;
                                addressGeometryString = JSON.stringify(
                                    addressSuggestion.geometry
                                );
                                addressSuggestions = [];
                            }}>{addressSuggestion.display_name}</button
                        >
                    {/each}
                </div>
            </div>
            <div class="sm:col-span-2">
                <Label for="description" class="mb-2">Votre description</Label>
                <Textarea
                    id="description"
                    placeholder="Décrivez rapidement votre parcours, vos expériences et qui vous-êtes"
                    rows="4"
                    name="description"
                    value={data?.details.description}
                    required
                />
            </div>
        </div>
        <div class="text-center mt-6">
        <Button type="submit" class="bg-orange">Sauvegarder mon profil</Button>
        </div>
    </form>
<!-- </Section> -->
</div>
