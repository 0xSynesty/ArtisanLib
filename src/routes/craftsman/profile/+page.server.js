import { redirect } from '@sveltejs/kit'
import { updateCraftsmanDetails, getCraftsmanDetails } from '$lib/usersdb.js'

export const load = async ({ locals }) => {
    if (locals.role !== 'craftsman' || !locals.user) {
        throw redirect(302, '/')
    }
    const details = await getCraftsmanDetails(locals.user_id)
    return { details }
}
export const actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData()
        // retrieve lastname, firstname, profession, description, siret, address, address-geometry
        const lastname = data.get('lastname')
        const firstname = data.get('firstname')
        const profession = data.get('profession')
        const description = data.get('description')
        const siret = data.get('siret')
        const address = data.get('address')

        const addressGeometry = data.get('address-geometry')
        const parsedCoords = JSON.parse(addressGeometry).coordinates
        
        const details = await updateCraftsmanDetails({
            user_id: locals.user_id,
            lastname,
            firstname,
            profession,
            description,
            siret,
            address,
            parsedCoords
        })

        throw redirect(302, "/craftsman/profile?updated=True")
    }
}
