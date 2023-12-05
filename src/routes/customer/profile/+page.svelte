<script>
    import { enhance } from "$app/forms";
    import { CheckCircleSolid } from "flowbite-svelte-icons";
    import { page } from "$app/stores";
    import Geocoder from "$lib/Geocoder.svelte";

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

    let selected_skill;
    const skills = [
        { value: "0", name: "Débutant" },
        { value: "1", name: "Intérmédiaire" },
        { value: "2", name: "Avancé"},
    ];

    let address
    let addressGeometryString;

    if (data.details) {
        console.log(data.details)
        selected_skill = data.details.skill_level;
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
<div class="relative lg:w-2/3 m-auto">
    <h1 class="mb-4 text-xl font-bold">Mon profil Client</h1>

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
                <Label for="skill_level" class="mb-2">Compétences manuelles</Label>
                <Select
                    items={skills}
                    bind:value={selected_skill}
                    name="skill_level"
                    placeholder="-- Niveau de compétences manuelles --"
                    required
                />
            </div>
            <div>
                <Label for="siret" class="mb-2">Outils à votre disposition</Label>
                <Input
                    type="text"
                    name="tools"
                    placeholder="clé à molette, marteau, tournevis cruciforme."
                    required
                    value={data?.details?.tools}
                />
            </div>
            <div class="col-span-2">
                <Label for="address" class="mb-2">Votre adresse</Label>
                <Geocoder bind:address bind:addressGeometryString/>
            </div>
        </div>
        <div class="text-center mt-6">
            <Button type="submit" class="bg-orange"
                >Sauvegarder mon profil</Button
            >
        </div>
    </form>
</div>
