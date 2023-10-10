/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies, request }) => {
        console.log(await request.formData())	// TODO log the user in	
    }
}
