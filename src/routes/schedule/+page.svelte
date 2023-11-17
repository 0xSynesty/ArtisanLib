<script>
    export let data
    import { Input, Label, Radio, Button, Datepicker} from "flowbite-svelte";
    import { HomeSolid, MobilePhoneSolid, ArrowRightOutline} from 'flowbite-svelte-icons';
    import { enhance } from "$app/forms";

    console.log(data)

    let appointmentType = "home"
</script>
<div class="text-center">
    <h1 class="text-xl font-bold mb-2">
        Prendre rendez-vous avec {data.craftsmanDetails.firstname} {data.craftsmanDetails.lastname}
    </h1>
    <p class="italic text-gray-400">
        "{data.craftsmanDetails.description}""
    </p>
    <div class="space-y-4 md:space-y-6 sm:p-8">
        <form class="flex flex-col space-y-6" method="POST" use:enhance>
        <Label class="space-y-2">
            <span class="text-lg">Votre adresse</span>
            <Input type="input" name="address" value={data.customerAddress} class="w-2/3 m-auto border-2 border-gray-200" required/>
        </Label>
        <p class="mb-5 text-lg font-medium text-gray-900 dark:text-white">Type de prestation</p>
        <div class="grid gap-6 md:grid-cols-2 justify-center m-auto">
        <Radio name="appointmentType" group={appointmentType} value="home" custom>
            <div class="h-32 inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-orange peer-checked:border-orange peer-checked:text-orange hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="block h-18">
                <div class="w-full text-lg font-semibold">Intervention à domicile</div>
                <div class="w-full">Problèmes qui nécessitent l'intervention d'un expert</div>
            </div>
            <HomeSolid class="ml-3 w-6 h-6" />
            </div>
        </Radio>
        <Radio name="appointmentType" group={appointmentType} value="video" custom>
            <div for="hosting-big" class="h-32 inline-flex justify-between items-center p-5 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-orange peer-checked:border-orange peer-checked:text-orange hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div class="block">
                <div class="w-full text-lg font-semibold">Appel vidéo</div>
                <div class="w-full">Problèmes légers pour lesquels vous souhaitez simplement être guidés</div>
            </div>
            <MobilePhoneSolid class="ml-3 w-6 h-6" />
            </div>
        </Radio>
        </div>
          <label for="date">Date de l'intervention souhaitée</label>
          <input type="date" name="date" class="rounded-lg dark:bg-gray-700 w-72 m-auto" />
          <label for="time">Heure</label>
          <input type="time" name="time" class="rounded-lg dark:bg-gray-700 w-72 m-auto" />
        <Button type="submit" class="bg-orange w-80 m-auto">Prendre rendez-vous</Button>          
        </form>
    </div>
</div>