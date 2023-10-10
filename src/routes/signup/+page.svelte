<script lang="ts">import { Section, Register } from 'flowbite-svelte-blocks';
    import { Button, Checkbox, Label, Input } from 'flowbite-svelte';
</script>
    
<Section name="register">
    <Register href="/">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <form class="flex flex-col space-y-6" action="/">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Créer un compte</h3>
            <Label class="space-y-2">
            <span>Addresse e-mail</span>
            <Input type="email" name="email" placeholder="jean-michelin@gmail.com" required />
            </Label>
            <Label class="space-y-2">
            <span>Mot de passe</span>
            <Input type="password" name="password" placeholder="••••••••" required />
            </Label>
            <Label class="space-y-2">
            <span>Confirmer le mot de passe</span>
            <Input type="password" name="confirm-password" placeholder="••••••••" required />
            </Label>
            <Button type="submit" class="bg-orange">Créer un compte</Button>
            <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Vous avez déjà un compte ? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Connectez-vous ici</a>
            </div>
        </form>
        </div>
    </Register>
</Section>