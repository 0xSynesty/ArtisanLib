import { SPICYTHINGY } from '$env/static/private'
import jwt from 'jsonwebtoken'
import { findUserById,  hasUserUpdatedDetails } from '$lib/usersdb'

export async function handle ({ event, resolve }) {
    const authToken = event.cookies.get('authToken')
    if (authToken) {
        try {
            const decoded = jwt.verify(authToken, SPICYTHINGY)
            if (!decoded) event.locals.user = null
            else {
                const id = decoded.user_id
                const userResult = await findUserById(id)
                event.locals.user = userResult.email
                event.locals.role = userResult.role
                event.locals.user_id = id

                if (['craftmsan', 'customer'].includes(userResult.role)) {
                    if (!event.cookies.get('hasUpdatedDetails') || event.cookies.get('hasUpdatedDetails') === 'false') {
                        const hasUpdatedDetails = await hasUserUpdatedDetails(id, userResult.role)
                        event.locals.hasUpdatedDetails = hasUpdatedDetails
                        event.cookies.set('hasUpdatedDetails', hasUpdatedDetails, { maxAge: 60 * 60 * 2})
                    } else {
                        console.log("cookie found, not checking details")
                        event.locals.hasUpdatedDetails = true
                    }
                } else {
                    event.locals.hasUpdatedDetails = true
                }
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