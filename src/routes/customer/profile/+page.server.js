import { redirect, fail } from '@sveltejs/kit'
import { updateCustomerDetails, getCustomerDetails } from '$lib/usersdb.js'

export const load = async ({ locals }) => {
    if (locals.role !== 'customer' || !locals.user) {
        throw redirect(302, '/')
    }
    const details = await getCustomerDetails(locals.user_id)
    return { details }
}
export const actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData()

        const lastname = data.get('lastname')
        const firstname = data.get('firstname')
        const skill_level = data.get('skill_level')
        const tools = data.get('tools')
        const address = data.get('address')

        const addressGeometry = data.get('address-geometry')
        const parsedCoords = JSON.parse(addressGeometry)
        if (!parsedCoords){
            return fail(400, { error: 'Veuillez renseigner une adresse valide en utilisant les suggestions' })
        }
        
        await updateCustomerDetails({
            user_id: locals.user_id,
            lastname,
            firstname,
            skill_level ,
            tools,
            address,
            parsedCoords: parsedCoords.coordinates
        })

        throw redirect(302, "/customer/profile?updated=True")
    }
}
