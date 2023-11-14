import { redirect } from '@sveltejs/kit'
import { getCustomerAppointments, findUserByEmail, validateAppointment, deleteAppointment } from '$lib/usersdb.js'

export const load = async ({ locals }) => {
    // redirect user if not logged in
    if (!locals.user || locals.role ==! "customer") {
      throw redirect(302, '/')
    }
    // const craftsmanId = (await findUserByEmail(locals.user)).user_id
    const appointments = await getCustomerAppointments(locals.user)
    return {
      appointments
    }
  }

//   export const actions = {
//     validate: async ({ request }) => {
//         const appointmentId = (await request.formData()).get('id')
//         validateAppointment(appointmentId)
//         // throw redirect(302, "/appointmentConfirmed")
//     },
//     delete: async ({ request }) => {
//         const appointmentId = (await request.formData()).get('id')
//         deleteAppointment(appointmentId)
//         // throw redirect(302, "/appointmentConfirmed")
//     }
// }