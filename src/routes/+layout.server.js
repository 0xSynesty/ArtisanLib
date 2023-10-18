export async function load({ locals }) {
    let user, role = null
    let hasUpdatedDetails = true
    if (locals.user) user = locals.user
    if (locals.role) role = locals.role
    if (typeof locals.hasUpdatedDetails !== 'undefined') {
        hasUpdatedDetails = locals.hasUpdatedDetails;
    }
    return { user, role, hasUpdatedDetails }
}