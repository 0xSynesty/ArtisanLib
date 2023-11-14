<script>
    import { NavLi, NavUl, NavHamburger, Button } from "flowbite-svelte";
    export let user;
    export let hidden;
    export let toggle;
    export let role;
</script>

<div class="flex md:order-2">
    {#if !user}
        <Button
            href="/login"
            size="lg"
            class="mr-2 text-black bg-azure hover:bg-royal hover:text-white transition-all"
            >Se connecter</Button
        >
        <Button
            href="/register"
            size="lg"
            class="text-white bg-orange hover:bg-royal hover:text-white transition-all"
            >S'inscrire</Button
        >
    {:else}
        <div class="flex items-center mr-4 font-bold">
            <div>
                {user}
            </div>
        </div>
        <form method="POST" action="/logout">
            <Button
                type="submit"
                href=""
                size="lg"
                class="text-white bg-orange hover:bg-royal hover:text-white transition-all"
                >Se déconnecter</Button
            >
        </form>
    {/if}
    <NavHamburger on:click={toggle} />
</div>
{#if !user}
    <NavUl {hidden} class="order-1 max-h-14">
        <NavLi
            href="/about"
            class="text-base rounded-none hover:border-b-2 hover:border-b-oxford dark:hover:border-b-white"
            >À propos de nous</NavLi
        >
        <NavLi
            href="/services"
            class="text-base rounded-none hover:border-b-2 hover:border-b-oxford dark:hover:border-b-white"
            >Nos services</NavLi
        >
        <NavLi
            href="/pricing"
            class="text-base rounded-none hover:border-b-2 hover:border-b-oxford dark:hover:border-b-white"
            >Tarifs</NavLi
        >
    </NavUl>
{:else if user && role === "customer"}
    <NavUl {hidden} class="order-1 max-h-14">
        <NavLi
            href="/findCraftsman"
            class="text-base rounded-none hover:border-b-2 hover:border-b-oxford dark:hover:border-b-white"
            >Trouver un artisan</NavLi
        >
        <NavLi
            href="/customer/profile"
            class="text-base rounded-none hover:border-b-2 hover:border-b-oxford dark:hover:border-b-white"
            >Mon profil</NavLi
        >
        <NavLi
            href="/customerAppointments"
            class="text-base rounded-none hover:border-b-2 hover:border-b-oxford dark:hover:border-b-white"
            >Mes rendez-vous</NavLi
        >
    </NavUl>
{:else if user && role === "craftsman"}
    <NavUl {hidden} class="order-1 max-h-14">
        <NavLi
            href="/craftsman/profile"
            class="text-base rounded-none hover:border-b-2 hover:border-b-oxford dark:hover:border-b-white"
            >Mon profil professionnel</NavLi
        >
        <NavLi
            href="/agenda"
            class="text-base rounded-none hover:border-b-2 hover:border-b-oxford dark:hover:border-b-white"
            >Agenda</NavLi
        >
        <NavLi
            href="/craftsmanAppointments"
            class="text-base rounded-none hover:border-b-2 hover:border-b-oxford dark:hover:border-b-white"
            >Mes rendez-vous</NavLi
        >
    </NavUl>
{/if}
