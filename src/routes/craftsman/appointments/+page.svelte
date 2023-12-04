<script>
    import {
        Badge,
        Button,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
    } from "flowbite-svelte";
    import StatusBadge from "$lib/StatusBadge.svelte";
    import { formatDateString } from "$lib/utils.js";
    export let data;

</script>

<h1 class="text-xl mb-2">Mes rendez-vous</h1>
<Table hoverable>
    <TableBody>
        {#each data.appointments as appointment}
            <TableBodyRow>
                <TableBodyCell tdClass="p-4 pl-0">
                    <StatusBadge status={appointment.status} />
                </TableBodyCell>
                <TableBodyCell tdClass="font-bold mr-8">
                    {formatDateString(appointment.appointment_date)}
                </TableBodyCell>
                <TableBodyCell tdClass="w-[220px]">{appointment.customer_address}</TableBodyCell>
                <TableBodyCell>{appointment.customer_email}</TableBodyCell>
                <TableBodyCell tdClass="">{appointment.description}</TableBodyCell>
                <TableBodyCell tdClass="p-0"
                    >{#if appointment.status === "pending"}
                        <form method="POST" action="?/validate" class="inline">
                            <input
                                type="hidden"
                                name="id"
                                value={appointment.appointment_id}
                            />
                            <Button
                                type="submit"
                                class="bg-orange my-auto border-2 border-orange hover:bg-oxford hover:border-oxford"
                                >Accepter</Button
                            >
                        </form>
                    {/if}
                </TableBodyCell>
                <TableBodyCell tdClass="p-0">
                    <form method="POST" action="?/delete" class="inline">
                        <input
                            type="hidden"
                            name="id"
                            value={appointment.appointment_id}
                        />
                        <Button
                            type="submit"
                            class="border-2 border-orange hover:bg-orange text-black hover:text-white dark:text-white"
                            >{appointment.status === "pending" ? "Refuser" : "Annuler"}</Button
                        >
                    </form>
                </TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</Table>
