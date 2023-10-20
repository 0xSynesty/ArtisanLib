import { getCraftsmanDetails } from '$lib/usersdb.js'
import { fail, redirect } from '@sveltejs/kit'
import { createPendingAppointment } from '$lib/usersdb.js'

export const load = async ({ locals, url }) => {
    // redirect user if not logged in
    if (!locals.user || locals.role ==! "customer") {
      throw redirect(302, '/')
    }
    const craftsmanId = url.searchParams.get('craftsmanId')
    const address = url.searchParams.get('address')
    const craftsmanDetails = await getCraftsmanDetails(craftsmanId)
    return {
      craftsmanDetails,
      address
    }
  }

  export const actions = {
    default: async ({ request, url, locals }) => {
        const data = await request.formData()
        const craftsmanUserId = url.searchParams.get('craftsmanId')
        const customerEmailAddress = locals.user

        const appointmentDate = data.get('date')
        const customerAddress = data.get('address')
        const appointmentType = data.get('appointmentType')

        const res = await createPendingAppointment(craftsmanUserId, customerAddress, customerEmailAddress, appointmentDate, appointmentType)
        throw redirect(302, "/appointmentConfirmed")
    }
}