import { redirect } from '@sveltejs/kit'

export function load() {
    throw redirect(302, '/')
}

export const actions = {
    default: async ({ cookies }) => {
      cookies.set('authToken', '', {maxAge: 0})
      throw redirect(302, '/login')
    } 
  }
