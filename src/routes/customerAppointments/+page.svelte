<script>
    import { formatDateString } from "$lib/utils.js";
    import StatusBadge from "$lib/StatusBadge.svelte";
    import { HomeSolid, MobilePhoneSolid } from "flowbite-svelte-icons";
    export let data;

    const typePrestations = {
        serrurier: "Serrurerie", 
        artisan_polyvalent: "Intervention polyvalente",
        electricien: "Electricité",
        plombier: "Plomberie"
    }

    console.log(data.appointments)
</script>

<h1 class="text-xl mb-2 text-center">Mes rendez-vous</h1>
<div class="w-full text-center">
    {#each data.appointments as appointment}
    <div class="relative w-2/3 m-auto p-6 mb-4 border-2 rounded-lg dark:border-slate-600">
        <div class="absolute -right-1 top-3">
            <StatusBadge status={appointment.status}/>
        </div>
        <div class="absolute left-3 top-3">
            {#if appointment.appointment_type === "video"}
                <MobilePhoneSolid />
            {:else}
                <HomeSolid />
            {/if}
        </div>
        Le <strong>{formatDateString(appointment.appointment_date)}</strong>
        <div class="text-left">
            <span class="block">Artisan : <strong>{appointment.craftsman_lastname}</strong> {appointment.craftsman_firstname}</span>
            <span>Type de prestation : <strong>{typePrestations[appointment.profession]}</strong></span>
        </div>
    </div>
    {/each}
</div>
