<script>
    import { Badge } from "flowbite-svelte";
    import { CheckOutline, ClockOutline, CloseOutline } from "flowbite-svelte-icons";
    export let status;
</script>

<Badge
    large
    color={status === "pending"
        ? "yellow"
        : status === "accepted"
        ? "green"
        : ""}
    class="mr-6 p-2 ml-2"
    >
    <!-- {status === "pending" ? "En attente" : "Validé"} -->
    {#if status === "pending"}
        <ClockOutline />
    {:else if status === "accepted"}
        <CheckOutline />
    {:else if status === "refused"}
        <CloseOutline />
    {/if}
    </Badge
>
