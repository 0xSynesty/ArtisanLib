<script lang="ts">import { Section, Register } from 'flowbite-svelte-blocks';
    import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
    </script>
    
<Section name="login">
    <Register href="/">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form class="flex flex-col space-y-6" method="POST">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Connexion</h3>
        <Label class="space-y-2">
            <span>Votre addresse e-mail</span>
            <Input type="email" name="email" placeholder="jean-michelin@gmail.com" required />
        </Label>
        <Label class="space-y-2">
            <span>Votre mot de passe</span>
            <Input type="password" name="password" placeholder="••••••••" required />
        </Label>
        <div class="flex items-start">
            <Checkbox>Se souvenir de moi</Checkbox>
            <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Mot de passe oublié ?</a>
        </div>
        <Button type="submit" class="bg-orange">Se connecter</Button>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Pas encore de compte ? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Créez-en un maintenant</a>
        </p>
        </form>
    </div>
    </Register>
</Section>