<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import L from 'leaflet'
    let mapElement;
    let map;
    const initialView = [48.8516591,2.4199818];

    onMount(async () => {
        if (browser) {
            map = L.map(mapElement).setView(initialView, 15);
            L
                .tileLayer(
                    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    {
                        attribution:
                            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    }
                )
                .addTo(map);
        }
    });
</script>

<main class="grid grid-cols-3 h-full w-full">
    <div id="craftsman" class="col-span-1"></div>
    <div class="h-96 w-full border col-span-2" bind:this={mapElement} />
</main>

<style>
    @import "leaflet/dist/leaflet.css";
</style>
