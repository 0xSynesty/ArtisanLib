import { redirect, fail } from '@sveltejs/kit'
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

        const lastname = data.get('lastname')
        const firstname = data.get('firstname')
        const profession = data.get('profession')
        const description = data.get('description')
        const siret = data.get('siret')
        const address = data.get('address')

        const addressGeometry = data.get('address-geometry')
        const parsedCoords = JSON.parse(addressGeometry)
        if (!parsedCoords){
            return fail(400, { error: 'Veuillez renseigner une adresse valide en utilisant les suggestions' })
        }
        
        const details = await updateCraftsmanDetails({
            user_id: locals.user_id,
            lastname,
            firstname,
            profession,
            description,
            siret,
            address,
            parsedCoords: parsedCoords.coordinates
        })

        throw redirect(302, "/craftsman/profile?updated=True")
    }
}
