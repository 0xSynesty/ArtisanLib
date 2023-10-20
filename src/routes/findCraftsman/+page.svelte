<script>
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import Geocoder from "$lib/Geocoder.svelte";
    import L from "leaflet";
    export let data;
    let mapElement;
    let map;
    // const initialView = [48.8516591,2.4199818];
    let address;
    let addressGeometryString = false;
    onMount(() => {
        if (browser) {
            map = L.map(mapElement).setView(data.coordsParsed.reverse(), 12);
            L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);
            map.on('popupopen', handlePopupOpen);
        }
    });
    onDestroy(async () => {
        if(map) {
            map.remove();
        }
    });

    const handleSubmission = () => {
        goto(`/findCraftsman?coordinates=${addressGeometryString}`);
        map.flyTo(JSON.parse(addressGeometryString).coordinates.reverse(), 13);
    };
    
    $: if (map) {
        updateMarkers(data.craftsmen)
    }

    let markers = [];
    const updateMarkers = (craftsmen) => {
        markers.forEach((marker) => marker.remove());
        craftsmen.forEach((craftsman) => {
            const coords = JSON.parse(craftsman.geometry).coordinates;
            craftsman.marker = L.marker(coords.reverse()).addTo(map);
            craftsman.marker.bindPopup(
                `<b class="font-bold">${craftsman.firstname} ${craftsman.lastname}</b>
                <span class="block text-gray-400">${craftsman.address}</span>
                <span class="block mb-2">${craftsman.description}</span>
                <button id="submit-button" class="mr-0 ml-auto block rounded p-2 bg-orange text-white">Prendre rendez-vous</button>
                `
            );
            markers.push(craftsman.marker);
        });
    };
    let selectedCraftsman

    const handlePopupOpen = (event) => {
        const popupElement = event.popup.getElement();
        const button = popupElement.querySelector('#submit-button');
        button.addEventListener('click', submitCraftsman);
    };
    const submitCraftsman = () => {
        goto(`schedule?craftsmanId=${selectedCraftsman.user_id}&address=${address.display_name}`)
    };


</script>

<div class="lg:max-w-3xl m-auto">
    <span class="block text-gray-800 dark:text-gray-200 mb-1">Votre addresse</span>
    <Geocoder
        bind:address
        bind:addressGeometryString
        on:addressSelected={handleSubmission}
        placeholder="Renseignez l'adresse à laquelle vous souhaitez une intervention"
    />
</div>
<main class="grid grid-cols-3 h-[800px] w-full mt-6">
    <div id="craftsman" class="col-span-1 overflow-y-auto border rounded-l-lg bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white border-gray-300 border-r-0 dark:border-gray-600">
    {#if data.craftsmen.length === 0}
        <div class="text-center mt-2">Aucun artisan trouvé</div>
    {/if}
        {#each data.craftsmen as craftsman}
            <button class="relative border-b-2 border-gray-300 dark:border-gray-600 hover:bg-gray-200 hover:dark:bg-gray-600 p-2 {selectedCraftsman === craftsman ? 'bg-gray-200 dark:bg-gray-600' : ''} w-full"
                    on:click={() => {
                        map.flyTo(JSON.parse(craftsman.geometry).coordinates.reverse(), 15);
                        selectedCraftsman = craftsman
                        craftsman.marker.openPopup()}}>
                <span class="text-base block text-right -mt-2">{craftsman.professionDisplay}</span>
                <span class="text-lg block">{craftsman.firstname} {craftsman.lastname}</span>
                <span class="block text-gray-500 dark:text-gray-400">{craftsman.address}</span>
                
                <span class="text-xs block text-gray-500 dark:text-gray-400 text-right">{parseInt(craftsman.distance)} mètres</span>
            </button>
        {/each}
    </div>
    <div class="h-[800px] w-full border col-span-2 rounded-r-lg" bind:this={mapElement} />
</main>

<style>
    @import "leaflet/dist/leaflet.css";
</style>
