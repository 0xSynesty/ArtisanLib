<script>
    import { enhance } from "$app/forms";
    import { CheckCircleSolid } from "flowbite-svelte-icons";
    import { page } from "$app/stores";
    import Geocoder from "$lib/Geocoder.svelte";
    import { professions } from "$lib/utils.js";
    import {
        Label,
        Input,
        Button,
        Select,
        Textarea,
        Toast,
    } from "flowbite-svelte";
    export let data;
    export let form;

    let selected_prof;

    let address
    let addressGeometryString;

    if (data.details) {
        selected_prof = data.details.profession;
        address = {
            display_name: data.details.address,
            geometry: JSON.parse(data.details.address_geometry),
        };
        addressGeometryString = data.details.address_geometry;
    } else {
        console.log("no data");
    }

    $: detailsUpdateConfirmation =
        $page.url.searchParams.get("updated") === "True";
</script>

{#if detailsUpdateConfirmation && !form?.error}
    <div class="flex justify-center text-center mb-6">
        <Toast
            color="green"
            divClass="w-auto border-green-400 border p-4"
            contentClass="mr-4"
        >
            <CheckCircleSolid slot="icon" />
            <span class="ml-2">Votre profil a bien été mis à jour</span>
        </Toast>
    </div>
{/if}
{#if form?.error}
    <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
        role="alert"
    >
        <strong class="font-bold">Erreur :</strong>
        <span class="block sm:inline">{form.error}</span>
    </div>
{/if}
<div class="relative w-full lg:w-2/3 m-auto">
    <h1 class="mb-4 text-xl font-bold">Mon profil Artisan</h1>

    <form method="POST" use:enhance>
        <div class="grid gap-4 sm:gap-6">
            <div class="w-full">
                <Label for="lastname" class="mb-2">Nom</Label>
                <Input
                    type="text"
                    name="lastname"
                    placeholder="Votre nom"
                    value={data?.details?.lastname}
                    required
                />
            </div>
            <div>
                <Label for="firstname" class="mb-2">Prénom</Label>
                <Input
                    type="text"
                    name="firstname"
                    placeholder="Votre prénom"
                    value={data?.details?.firstname}
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
                    placeholder="Ex : 553 279 879 00672"
                    required
                    value={data?.details?.siret}
                />
            </div>
            <div class="col-span-2">
                <Label for="address" class="mb-2">Votre adresse</Label>
                <Geocoder bind:address bind:addressGeometryString/>
            </div>
            <div class="sm:col-span-2">
                <Label for="description" class="mb-2">Votre description</Label>
                <Textarea
                    id="description"
                    placeholder="Décrivez rapidement votre parcours, vos expériences et qui vous-êtes"
                    rows="4"
                    name="description"
                    value={data?.details?.description}
                    required
                />
            </div>
        </div>
        <div class="text-center mt-6">
            <Button type="submit" class="bg-orange"
                >Sauvegarder mon profil</Button
            >
        </div>
    </form>
</div>
