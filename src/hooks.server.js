import { SPICYTHINGY } from '$env/static/private'
import jwt from 'jsonwebtoken'
import { findUserById } from '$lib/usersdb'

export async function handle ({ event, resolve }) {
    const authToken = event.cookies.get('authToken')
    if (authToken) {
        try {
            const decoded = jwt.verify(authToken, SPICYTHINGY)
            if (!decoded) event.locals.user = null
            else {
                const userResult = await findUserById(decoded.user_id)
                event.locals.user = userResult.email
                event.locals.role = userResult.role
            }
        } catch (err) {
            console.log('hooks, shit happend', err)
            event.locals.user = null
        }
    } else {
        event.locals.user = null
    }
    return await resolve(event)
}