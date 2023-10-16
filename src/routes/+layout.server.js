export async function load({ locals }) {
    let user = null
    if (locals.user) user = locals.user
    return { user }
}