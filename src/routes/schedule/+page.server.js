import { getCraftsmanDetails, getCustomerDetails } from '$lib/usersdb.js'
import { redirect } from '@sveltejs/kit'
import { createPendingAppointment } from '$lib/usersdb.js'

export const load = async ({ locals, url }) => {
    // redirect user if not logged in
    if (!locals.user || locals.role ==! "customer") {
      throw redirect(302, '/')
    }
    const craftsmanId = url.searchParams.get('craftsmanId')
    const address = url.searchParams.get('address')
    const craftsmanDetails = await getCraftsmanDetails(craftsmanId)
    const customerDetails = await getCustomerDetails(locals.user_id)
    console.log(locals)
    return {
      craftsmanDetails,
      customerAddress: customerDetails.address,
      address
    }
  }

  export const actions = {
    default: async ({ request, url, locals }) => {
        const data = await request.formData()
        const craftsmanUserId = url.searchParams.get('craftsmanId')
        const customerEmailAddress = locals.user

        const appointmentDate = data.get('date')
        const appointmentTime = data.get('time')
        const customerAddress = data.get('address')
        const appointmentType = data.get('appointmentType')
        const description = data.get('description')

        await createPendingAppointment(craftsmanUserId, customerAddress, customerEmailAddress, appointmentDate, appointmentTime, appointmentType, description)
        throw redirect(302, "/appointmentConfirmed")
    }
}