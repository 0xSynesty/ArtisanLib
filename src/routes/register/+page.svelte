<script>
    import { Section, Register } from "flowbite-svelte-blocks";
    import { Button, Label, Input, Radio } from "flowbite-svelte";
    import { enhance } from "$app/forms";
    export let form;
    let role = "particulier";
</script>

<Section name="register">
    <Register>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
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
                    <span class="block sm:inline"
                        >Le compte a bien été créé !</span
                    >
                </div>
            {/if}
            <form class="flex flex-col space-y-6" method="POST" use:enhance>
                <h3
                    class="text-xl font-medium text-gray-900 dark:text-white p-0"
                >
                    Créer un compte
                </h3>
                <Label class="space-y-2">
                    <span>Adresse e-mail</span>
                    <Input
                        type="email"
                        name="email"
                        placeholder="jean-michelin@gmail.com"
                        required
                    />
                </Label>
                <Label class="space-y-2">
                    <span>Mot de passe</span>
                    <Input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    />
                </Label>
                <Label class="space-y-2">
                    <span>Confirmez le mot de passe</span>
                    <Input
                        type="password"
                        name="confirm-password"
                        placeholder="••••••••"
                        required
                    />
                </Label>
                <Label class="space-y-2">
                    <span>Qui êtes-vous ?</span>
                    <Radio name="role" group={role} value="particulier">Particulier</Radio>
                    <Radio name="role" group={role} value="artisan">Artisan</Radio>
                </Label>
                <Button type="submit" class="bg-orange">Créer un compte</Button>
                <div
                    class="text-sm font-medium text-gray-500 dark:text-gray-300"
                >
                    Vous avez déjà un compte ? <a
                        href="/login"
                        class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >Connectez-vous ici</a
                    >
                </div>
            </form>
        </div>
    </Register>
</Section>
