const faunadb = require('faunadb');
const crypto = require("crypto");

/* configure faunaDB Client with our secret */
const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = async function (event, context) {
    console.log('Method', event.httpMethod);
    if (event.httpMethod === "GET") {
        return handleGet(event);
    } else if (event.httpMethod === "POST") {
        return handlePost(event);
    } else {
        return { statusCode: 405, body: "Method Not Allowed" };
    }
}

async function handleGet(event) {
    const { target } = event.queryStringParameters;
    console.log("target", target)

    if (!target) {
        return { statusCode: 400, body: "Invalid parameters" };
    }

    if (!validateTarget(target)) {
        return { statusCode: 404, body: "Invalid target" };
    }

    try {
        const query = q.Get(q.Match(q.Index('ratings'), target))
        const { data } = await client.query(query);
        const { stars } = data;

        if (data) {
            return { statusCode: 200, body: JSON.stringify({ stars }) };
        } else {
            return { statusCode: 404, body: JSON.stringify({ error: 'Not rated' }) };
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify(error)
        }
    }
}

async function handlePost(event) {
    const { target, stars } = JSON.parse(event.body);

    if (!target || stars > 5 || stars < 1) {
        return { statusCode: 400, body: "Invalid parameters" };
    }

    if (!validateTarget(target)) {
        return { statusCode: 404, body: "Invalid target" };
    }

    try {
        const query = q.If(
            q.Exists(q.Match(q.Index('ratings'), target)),
            q.Update(q.Select("ref", q.Get(q.Match(q.Index('ratings'), target))), { data: { target, stars } }),
            q.Create(q.Collection("ratings"), { data: { target, stars } })
        )
        // const query = q.Create(q.Ref("classes/ratings"), { data: { target, stars } });
        await client.query(query);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify(error, null, 2)
        }
    }
}

function validateTarget(target) {
    const [hash, nim = ''] = target.split("-");
    const secret = process.env.GEN_SECRET || "hmif-itb";
    const mac = crypto.createHmac("sha1", secret).update(nim).digest("hex");
    return hash === mac;
}