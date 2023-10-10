<script>
  import "../app.postcss";
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Button,
  } from "flowbite-svelte";
  import { DarkMode } from "flowbite-svelte";
</script>

<div class="relative h-[100px]">
  <Navbar let:hidden let:toggle class="mb-2 text-oxford">
    <DarkMode />
    <NavBrand href="/">
      <img
        src="/src/lib/images/logo.png"
        class="mr-3 h-6 sm:h-9"
        alt="Flowbite Logo"
      />
      <span
        class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        >Artisan'Lib</span
      >
    </NavBrand>
    <div class="flex md:order-2">
      <Button
        href="/login"
        size="lg"
        class="mr-2 text-black bg-azure hover:bg-royal hover:text-white transition-all"
        >Se connecter</Button
      >
      <Button
        href="/signup"
        size="lg"
        class="text-white bg-orange hover:bg-royal hover:text-white transition-all"
        >S'inscrire</Button
      >
      <NavHamburger on:click={toggle} />
    </div>
    <NavUl {hidden} class="order-1 max-h-14">
      <NavLi
        href="/about"
        class="text-base rounded-none hover:border-b-2 hover:border-b-oxford dark:hover:border-b-white"
        >Mentions légales</NavLi
      >
      <NavLi
        href="/services"
        class="text-base rounded-none hover:border-b-2 hover:border-b-oxford dark:hover:border-b-white"
        >Nos services</NavLi
      >
      <NavLi
        href="/pricing"
        class="text-base rounded-none hover:border-b-2 hover:border-b-oxford dark:hover:border-b-white"
        >Tarifs</NavLi
      >
    </NavUl>
  </Navbar>

  <div class="content px-20 py-6 dark:text-white">
    <slot class="relative" />
  </div>

  <footer
    class="bg-white rounded-lg shadow dark:bg-gray-900 absolute w-full"
  >
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <a href="/" class="flex items-center mb-4 sm:mb-0">
          <img
            src="/src/lib/images/logo.png"
            class="h-8 mr-3"
            alt="Flowbite Logo"
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
            <a href="/about" class="mr-4 hover:underline md:mr-6"
              >Mentions Légales</a
            >
          </li>
          <li>
            <a href="/contact" class="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
      />
      <span
        class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2023 <a href="/" class="hover:underline">Artisan'Lib</a>.</span
      >
    </div>
  </footer>
</div>

<style lang="postcss">
  footer {
    height: 100px;
  }
  .content {
    min-height: calc(100vh - 200px);
    max-width: 80%;
    margin: auto;
  }
</style>