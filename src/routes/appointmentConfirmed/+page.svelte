<script>
    import { ClockSolid } from "flowbite-svelte-icons";
    import { Toast } from "flowbite-svelte";
</script>

<div>
    <Toast
        color="yellow"
        divClass="w-auto border-yellow-400 border p-4"
        contentClass="mr-4"
        dismissable={false}
    >
        <ClockSolid slot="icon" />
        <span class="ml-2"
            >Votre rendez-vous va être validé sous peu par le prestataire</span
        >
    </Toast>
</div>
