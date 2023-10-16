import { DATABASE_URL_ROOT } from '$env/static/private';
import postgres from 'postgres';
import bcrypt from 'bcryptjs';

const sql = postgres(DATABASE_URL_ROOT + "users", {
	ssl: 'require'
});

const rolesTrad = {
    "artisan": "craftsman",
    "particulier": "customer"
}

async function registerUser(email, password, roleFr) {
    const user = {
        error: null,
        id: null
    }
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Insert the user into the database
        const result = await sql`
            INSERT INTO users_logs (email, password_hash, role)
            VALUES (${email}, ${hashedPassword}, ${rolesTrad[roleFr]})
            RETURNING user_id;
        `

        // Get the user_id of the new user
        const userId = result[0].user_id
        user.id = userId
        return user
    } catch (error) {
        console.error(error)
        if (error.message.includes('duplicate key value violates unique constraint "users_log_email_key"')) {
            user.error = "Tu es déjà inscrit 🤓☝️"
            return user
        }
        else {
            user.error = error.message
        }
        return user
    }
}

async function findUserByEmail(email) {
    const result = await sql`
        SELECT * FROM users_logs
        WHERE email = ${email};
    `
    return result[0]
}


async function findUserById(user_id) {
    const result = await sql`
        SELECT * FROM users_logs
        WHERE user_id = ${user_id};
    `
    return result[0]
}



export { registerUser, findUserByEmail, findUserById }