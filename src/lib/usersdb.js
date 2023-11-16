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

async function updateCraftsmanDetails({ user_id, lastname, firstname, profession, description, siret, address, parsedCoords }) {
    const result = await sql`
    INSERT INTO craftsman_detail (
        user_id,
        lastname,
        firstname,
        profession,
        description,
        siret,
        address,
        address_coordinates
    ) VALUES (
        ${user_id},
        ${lastname},
        ${firstname},
        ${profession},
        ${description},
        ${siret},
        ${address},
        ST_SetSRID(ST_Point(${parsedCoords[0]}, ${parsedCoords[1]}), 4326)
    ) ON CONFLICT (user_id) DO UPDATE SET
        lastname = EXCLUDED.lastname,
        firstname = EXCLUDED.firstname,
        profession = EXCLUDED.profession,
        description = EXCLUDED.description,
        siret = EXCLUDED.siret,
        address = EXCLUDED.address,
        address_coordinates = ST_SetSRID(ST_Point(${parsedCoords[0]}, ${parsedCoords[1]}), 4326);
    `
    return result[0]
}

async function getCraftsmanDetails(user_id) {
    const result = await sql`
    SELECT
        user_id,
        lastname,
        firstname,
        profession,
        description,
        siret,
        address,
        ST_AsGeoJSON(address_coordinates) AS address_geometry
    FROM
        craftsman_detail
    WHERE
        user_id = ${user_id};
    `
    return result[0]
}

async function hasUserUpdatedDetails(user_id, role) {
    let table_name = `${role}_detail`
    const result = await sql`
        SELECT user_id
        FROM ${sql(table_name)}
        WHERE user_id = ${user_id}
        LIMIT 1;
    `
    return result.length > 0;
}


async function updateCustomerDetails({ user_id, lastname, firstname, skill_level, tools, address, parsedCoords }) {
    const result = await sql`
    INSERT INTO customer_detail (
        user_id,
        lastname,
        firstname,
        skill_level,
        tools,
        address,
        address_coordinates
    ) VALUES (
        ${user_id},
        ${lastname},
        ${firstname},
        ${skill_level},
        ${tools},
        ${address},
        ST_SetSRID(ST_Point(${parsedCoords[0]}, ${parsedCoords[1]}), 4326)
    ) ON CONFLICT (user_id) DO UPDATE SET
        lastname = EXCLUDED.lastname,
        firstname = EXCLUDED.firstname,
        skill_level = EXCLUDED.skill_level,
        tools = EXCLUDED.tools,
        address = EXCLUDED.address,
        address_coordinates = ST_SetSRID(ST_Point(${parsedCoords[0]}, ${parsedCoords[1]}), 4326);
    `
    return result[0]
}

async function getCustomerDetails(user_id) {
    const result = await sql`
    SELECT
        user_id,
        lastname,
        firstname,
        skill_level,
        tools,
        address,
        ST_AsGeoJSON(address_coordinates) AS address_geometry
    FROM
        customer_detail
    WHERE
        user_id = ${user_id};
    `
    return result[0]
}


async function getCraftsmenWithinBuffer(coordsParsed) {
    const result = await sql`
    SELECT
        user_id,
        lastname,
        firstname,
        profession,
        description,
        siret,
        address,
        ST_AsGeoJSON(ST_Transform(address_coordinates, 4326)) as geometry,
        ST_Distance(
            ST_Transform(address_coordinates, 3857),
            ST_Transform(ST_SetSRID(ST_Point(${coordsParsed[0]}, ${coordsParsed[1]}), 4326), 3857)
        ) as distance
    FROM
        craftsman_detail
    WHERE
        ST_DWithin(
            ST_Transform(address_coordinates, 3857),
            ST_Transform(ST_SetSRID(ST_Point(${coordsParsed[0]}, ${coordsParsed[1]}), 4326), 3857),
            5000
        )
    ORDER BY
        distance;
`
    return result
}


async function createPendingAppointment(craftsmanId, customerAddress, customerEmail, appointmentDate, appointmentType) {
    const result = await sql`
    INSERT INTO craftsman_appointments (
        user_id,
        customer_address,
        customer_email,
        appointment_date,
        appointment_type
    ) VALUES (
        ${craftsmanId},
        ${customerAddress},
        ${customerEmail},
        ${appointmentDate},
        ${appointmentType}
    )
        RETURNING appointment_id;
    `;
    return result[0].appointment_id;
}

async function getCraftsmanAppointments(craftsmanId) {
    const result = await sql`
    SELECT
        appointment_id,
        user_id,
        customer_address,
        customer_email,
        appointment_date,
        status,
        appointment_type
    FROM
        craftsman_appointments
    WHERE
        user_id = ${craftsmanId};
`;
    return result;
}


async function getCustomerAppointments(user_email) {
    const result = await sql`
    SELECT
        a.appointment_id,
        a.user_id,
        a.customer_address,
        a.customer_email,
        a.appointment_date,
        a.status,
        a.appointment_type,
        u.lastname craftsman_lastname,
        u.firstname craftsman_firstname,
        u.profession,
        u.description
    FROM
        craftsman_appointments a
    JOIN
        craftsman_detail u ON a.user_id = u.user_id
    WHERE
        a.customer_email = ${user_email};
`;
    return result;
}


async function deleteAppointment(appointmentId) {
    const result = await sql`
    DELETE FROM
        craftsman_appointments
    WHERE
        appointment_id = ${appointmentId};
`;
    return result;
}

async function validateAppointment(appointmentId) {
    const result = await sql`
    UPDATE
        craftsman_appointments
    SET
        status = 'accepted'
    WHERE
        appointment_id = ${appointmentId};
`;
    return result;
}

export {
    registerUser,
    findUserByEmail,
    findUserById,
    updateCraftsmanDetails,
    getCraftsmanDetails,
    updateCustomerDetails,
    getCustomerDetails,
    hasUserUpdatedDetails,
    getCraftsmenWithinBuffer,
    createPendingAppointment,
    getCraftsmanAppointments,
    getCustomerAppointments,
    deleteAppointment,
    validateAppointment
}