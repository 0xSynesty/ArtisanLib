import { findUserByEmail } from '$lib/usersdb.js'
import { fail, redirect } from '@sveltejs/kit'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SPICYTHINGY } from '$env/static/private'

export function load({ locals }){
    if (locals.user) throw redirect(302, '/')
}
export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData()
        const email = data.get('email')
        const password = data.get('password')

        const user = await findUserByEmail(email)
        if (!user) return fail(400, { error: "Email ou mot de passe incorrect" })
        const passwordMatch = await bcrypt.compare(password, user.password_hash)
        if (!passwordMatch) return fail(400, { error: "Email ou mot de passe incorrect" })
        
        const authToken = jwt.sign({ user_id: user.user_id, role: user.role }, SPICYTHINGY, { expiresIn: '2h' })
        cookies.set('authToken', authToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 2})
        throw redirect(302, "/")
    }
}
