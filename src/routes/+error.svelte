<script>
    import { page } from '$app/stores'
    import mike404 from '$lib/images/mike404.jpg'
</script>

<div class="text-center">
    <h1 class="font-bold text-xl mb-4">
        {$page.status} {$page.error.message}
    </h1>
    <img src={mike404} alt="mike wazowski" width="200" class="m-auto mb-6 rounded-lg" />
    <h1 class="bg-slate-500 rounded-lg p-4">
        Un peu de patience ! Cette page est en cours de développement (peut être pour 10 ans encore en vrai)
    </h1>
</div>