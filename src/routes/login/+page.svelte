<script>
    import { Section, Register } from "flowbite-svelte-blocks";
    import { Button, Checkbox, Label, Input, Toast } from "flowbite-svelte";
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import { CheckCircleSolid } from "flowbite-svelte-icons";
    export let form;

    $: creationConfirmation = $page.url.searchParams.get("created") === "True";
</script>

{#if creationConfirmation}
    <div class="flex justify-center text-center">
        <Toast
            color="green"
            divClass="w-auto border-green-400 border p-4"
            contentClass="mr-4"
        >
            <CheckCircleSolid slot="icon" />
            <span class="ml-2">Votre compte a bien été créé</span>
        </Toast>
    </div>
{/if}

<Section name="register" sectionClass="lg:w-2/3 m-auto">
    <Register href="/">
        {#if form?.error}
            <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
            >
                <strong class="font-bold">Erreur :</strong>
                <span class="block sm:inline">{form.error}</span>
            </div>
        {/if}
        {#if form?.success}
            <div
                class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                role="alert"
            >
                <span class="block sm:inline">Vous êtes connecté</span>
            </div>
        {/if}
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form class="flex flex-col space-y-6" method="POST" use:enhance>
                <h3
                    class="text-xl font-medium text-gray-900 dark:text-white p-0"
                >
                    Connexion
                </h3>
                <Label class="space-y-2">
                    <span>Votre adresse e-mail</span>
                    <Input
                        type="email"
                        name="email"
                        placeholder="jean-michelin@gmail.com"
                        required
                    />
                </Label>
                <Label class="space-y-2">
                    <span>Votre mot de passe</span>
                    <Input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    />
                </Label>
                <Button type="submit" class="bg-orange">Se connecter</Button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Pas encore de compte ? <a
                        href="/"
                        class="inline-block font-medium text-primary-600 border-b hover:text-black dark:hover:text-white dark:text-primary-500 hover:border-black dark:hover:border-white"
                        >Créez-en un maintenant</a
                    >
                </p>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    <a
                        href="/"
                        class="inline-block font-medium text-primary-600 hover:text-black dark:hover:text-white dark:text-primary-500 dark:hover:border-white"
                        >Mot de passe oublié ?</a
                    >
                </p>
            </form>
        </div>
    </Register>
</Section>
