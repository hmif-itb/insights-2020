const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { idToken } = JSON.parse(event.body);
  const user = await verify(idToken);

  if (!user) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "User unauthorized" }),
    };
  }

  const nim = user.email.split("@")[0];
  const secret = process.env.GEN_SECRET || "hmif-itb";
  const mac = crypto.createHmac("sha1", secret).update(nim).digest("hex");

  return {
    statusCode: 200,
    body: JSON.stringify({ uid: mac + "-" + nim }),
  };
};

const authorizedGsuiteDomain = process.env.GSUITE_DOMAIN;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  const domain = payload["hd"];
  const name = payload["name"];
  const email = payload["email"];

  if (domain !== authorizedGsuiteDomain) {
    return null;
  }

  return { userid, domain, name, email };
}
