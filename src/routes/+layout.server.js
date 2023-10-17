export async function load({ locals }) {
    let user, role = null
    if (locals.user) user = locals.user
    if (locals.role) role = locals.role
    return { user, role }
}