<script>
  import { Button } from "flowbite-svelte";
  import { EuroSolid, ClockSolid } from "flowbite-svelte-icons";
</script>

<section class="dark:bg-gray-900 rounded-xl mb-6 bg-gray-100">
  <div
    class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6"
  >
    <img
      class="w-full rounded-xl"
      src="/src/lib/images/woman-call.jpg"
      alt="dashboard"
    />
    <div class="mt-4 md:mt-0">
      <h2 class="mb-4 text-4xl tracking-tight font-extrabold dark:text-white text-oxford">
        Problème léger ? Petite réparation ?
      </h2>
      <p class="mb-6 font-light text-oxford md:text-lg dark:text-white">
        Faites appel à nos experts pour vous assister à réaliser vous-mêmes vos
        répérations pour économiser jusqu'à 80% du prix d'une prestation
        classique.
      </p>
      <Button
        class="text-white bg-orange hover:bg-royal transition-all"
      >
        Demander de l'aide
        <svg
          class="ml-2 -mr-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          /></svg
        >
      </Button>
    </div>
  </div>
</section>

<!-- <div class="bg-gradient-to-r from-azure to-white rounded-xl dark:from-gray-900 dark:to-gray-800"> -->
<div class="grid grid-cols-2 content-evenly m-6 dark:text-black">
  <div>
    <EuroSolid size="xl"/>
    <h3>Économisez</h3>
    <p>Notre service vous permet d'économiser jusqu'à 80% sur le prix d'une
      intervention classique, pour une moyenne de <strong
        >105€ économisés</strong
      > par intervention</p>
  </div>
  <div>
    <ClockSolid size="xl"/>
    <h3>Gagnez du temps</h3>
    <p>Vous n'aurez plus besoin d'attendre que l'artisan soit disponible pour
      se rendre physiquement à votre domicile ce qui vous fera économiser à
      vous deux un temps précieux</p>
  </div>
</div>


<style lang="postcss">
  .grid > div {
    @apply m-10 p-8 rounded-xl border-2 border-azure border-dashed bg-slate-50;
    @apply shadow-xl;
  }

  .grid > div > h3 {
    @apply text-3xl my-4;
  }

  .grid > div > p {
    @apply text-lg;
  }
</style>