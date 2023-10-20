import { getCraftsmanDetails } from '$lib/usersdb.js'
import { fail, redirect } from '@sveltejs/kit'
import { getAppointments, findUserByEmail, validateAppointment, deleteAppointment } from '$lib/usersdb.js'

export const load = async ({ locals }) => {
    // redirect user if not logged in
    if (!locals.user || locals.role ==! "craftsman") {
      throw redirect(302, '/')
    }
    const craftsmanId = (await findUserByEmail(locals.user)).user_id
    const appointments = await getAppointments(craftsmanId)
    return {
      appointments
    }
  }

  export const actions = {
    validate: async ({ request }) => {
        console.log('')
        const appointmentId = (await request.formData()).get('id')
        validateAppointment(appointmentId)
        // throw redirect(302, "/appointmentConfirmed")
    },
    delete: async ({ request }) => {
        const appointmentId = (await request.formData()).get('id')
        deleteAppointment(appointmentId)
        // throw redirect(302, "/appointmentConfirmed")
    }
}