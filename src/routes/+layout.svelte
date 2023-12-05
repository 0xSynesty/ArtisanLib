<script>
  import "../app.postcss";
  import {
    Navbar,
    NavBrand,
  } from "flowbite-svelte";
  import { DarkMode, Alert } from "flowbite-svelte"
  import { InfoCircleSolid } from 'flowbite-svelte-icons'
  import logo from '$lib/images/logo.png'
  import NavMenu from "$lib/NavMenu.svelte";
  export let data
  import '@beyonk/gdpr-cookie-consent-banner/banner.css' // optional, you can also define your own styles
  import GdprBanner from '@beyonk/gdpr-cookie-consent-banner'

  function initAnalytics () {
    // do something with segment.io or google analytics etc
  }

  $: user = data?.user
  $: role = data?.role
  $: hasUpdatedDetails = data?.hasUpdatedDetails
</script>

<div>
  {#if !hasUpdatedDetails}
    <Alert type="warning" class="bg-slate-200 dark:bg-slate-200 dark:text-red-800 rounded-none border-b-2" color="red">
      <InfoCircleSolid slot="icon" />
      <span class="text-base">
        Veuillez <a href="/{role}/profile" class="font-bold underline">compléter votre profil</a> pour pouvoir accéder à toutes les
        fonctionnalités du site.
      </span>
    </Alert>
  {/if}
  <Navbar let:hidden let:toggle class="mb-2 text-oxford align-middle h-[80px] bg-slate-200">
    <DarkMode />
    <NavBrand href="/">
      <img
        src={logo}
        class="mr-3 h-6 sm:h-9 filter dark:brightness-200"
        alt="ArtisanLib LOGO"
      />
      <span
        class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
        >Artisan'Lib</span
      >
    </NavBrand>
    <NavMenu {hidden} {toggle} {user} {role}/>
  </Navbar>

  <div class="content lg:px-20 py-6 dark:text-white">
    <slot class="relative" />
  </div>

  <footer
    class="bg-white shadow dark:bg-gray-900 w-full"
  >
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <a href="/" class="flex items-center mb-4 sm:mb-0">
          <img
            src={logo}
            class="h-8 mr-3 filter dark:brightness-200"
            alt="ArtisanLib LOGO"
          />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Artisan'Lib</span
          >
        </a>
        <ul
          class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
        >
          <li>
            <a href="/legals" class="mr-4 hover:underline md:mr-6"
              >Mentions Légales</a
            >
          </li>
          <li>
            <a href="/contact" class="hover:underline">Contact</a>
          </li>
        </ul>
        <span
        class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2023 <a href="/" class="hover:underline">Artisan'Lib</a>.</span
      >
      </div>
    </div>
  </footer>
</div>

<GdprBanner
choices={{
  necessary: {
      label: "Cookies nécessaires",
      description: "Used for cookie control. Can't be turned off.",
      value: true
  },
  tracking: false,
  analytics: {
      label: "Cookies analytiques",
      description: "Utilisé pour Google Analytics un outil de Google qui permet de savoir ce que fait l'utilisateur et de vous proposer une meilleure expérience.",
      value: true
  },
  marketing: false
}}
canRejectCookies={true}
acceptLabel="Accepter"
rejectLabel="Refuser tout"
settingsLabel="Préférences"
closeLabel="Fermer la fenêtre"
editLabel="Modifier les préférences"
cookieName="foo" heading="Information RGPD" description="<p class='text-sm'>Nous prenons la confidentialité de vos données très au sérieux et utilisons des mesures de sécurité avancées pour protéger vos informations.

Les données que nous collectons et enregistrons servent uniquement à des fins internes. Ces informations nous aident à améliorer nos services et à vous offrir une meilleure expérience.

Nous ne partageons, ne vendons, ni ne communiquons vos données personnelles à des tiers.<p>" on:analytics={initAnalytics} />

<style lang="postcss">
  footer {
    height: 100px;
    min-height: 100px;
  }
  .content {
    min-height: calc(100vh - 180px);
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
</style>