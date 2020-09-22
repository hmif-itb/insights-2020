const faunadb = require('faunadb');
const crypto = require("crypto");

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = async function (event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { target, sessionId, events } = JSON.parse(event.body);

    if (!target || !sessionId || !events) {
        return { statusCode: 400, body: "Incomplete parameters" };
    }

    if (!events.every(e => !!e.time && !!e.type)) {
        return { statusCode: 400, body: "Incomplete parameters" };
    }

    if (!validateTarget(target)) {
        return { statusCode: 404, body: "Invalid target" };
    }

    const eventItem = { target, sessionId, events };

    try {
        await client.query(q.Create(q.Ref("classes/insights_events"), { data: eventItem }));
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify(error)
        }
    }
}

function validateTarget(target) {
    const [hash, nim = ''] = target.split("-");
    const secret = process.env.GEN_SECRET || "hmif-itb";
    const mac = crypto.createHmac("sha1", secret).update(nim).digest("hex");
    return hash === mac;
}