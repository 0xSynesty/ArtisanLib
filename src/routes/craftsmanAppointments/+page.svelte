<script>
    import { Badge } from "flowbite-svelte";
    import { CheckCircleSolid, CloseSolid } from "flowbite-svelte-icons";
    export let data;
    function formatDate(dateString) {
        const options = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        const date = new Date(dateString);
        const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
            date.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}/${date.getFullYear()} ${date
            .getHours()
            .toString()
            .padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")}`;
        return formattedDate;
    }
</script>

<h1 class="text-xl mb-2">Mes rendez-vous</h1>
<div class="border rounded-lg border-slate-600">
    {#each data.appointments as appointment}
        <div class="relative border-b border-slate-600 h-16 text-left p-4">
            <Badge
                large
                color={appointment.status === "pending"
                    ? "yellow"
                    : appointment.status === "accepted"
                    ? "green"
                    : ""}
                class="mr-6"
                >{appointment.status === "pending"
                    ? "En attente"
                    : "Validé"}</Badge
            >
            <span class="font-bold"
                >{formatDate(appointment.appointment_date)}</span
            >
            {appointment.customer_address}
            <span class="ml-8">{appointment.customer_email}</span>

            <div class="absolute right-4 bottom-4">
                <form method="POST" action="?/validate" class="inline">
                    <input
                        type="hidden"
                        name="id"
                        value={appointment.appointment_id}
                    />
                    <button type="submit">
                        <CheckCircleSolid />
                    </button>
                </form>
                <form method="POST" action="?/delete" class="inline">
                    <input
                        type="hidden"
                        name="id"
                        value={appointment.appointment_id}
                    />
                    <button type="submit">
                        <CloseSolid />
                    </button>
                </form>
            </div>
        </div>
    {/each}
</div>
