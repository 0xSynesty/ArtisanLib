import { registerUser } from '$lib/usersdb.js'
import { fail, redirect } from '@sveltejs/kit'

export function load({ locals }) {
    if (locals.user) throw redirect(302, '/')
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')
        const roleFr = data.get('role')

        if (!email || !password) return fail(400, { error: 'Mot de passe ou email manquant' })

        if (password !== data.get('confirm-password')) {
            return fail(400, { error: `Faut mettre les 2 mêmes mot de passe mdr: {${password}, ${data.get('confirm-password')}}` })
        }

        if (roleFr !== 'artisan' && roleFr !== 'particulier') return fail(400, { error: 'Role invalide' })
        const user = await registerUser(email, password, roleFr)
        if (user.error) return fail(400, { error: user.error });
        // return { success: "Le compte a bien été créé" }
        throw redirect(302, "/login?created=True")
    }
}

