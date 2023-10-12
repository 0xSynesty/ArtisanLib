
import jwt from 'jsonwebtoken'
import { registerUser } from '$lib/usersdb.js'
import { fail } from '@sveltejs/kit'


export async function load({ cookies }) {
    const authToken = cookies.get('authToken')
    if (!authToken) return { clearUser: true }
    return { clearUser: false }
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
        // const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' })
        // cookies.set('authToken', token, { httpOnly: true, secure: true, sameSite: 'strict' })
        return { success: "Le compte a bien été créé" }
    }
}

