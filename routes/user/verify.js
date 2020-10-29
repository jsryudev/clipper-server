'use strict';

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIPPER_GOOGLESIGNIN_CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
  });

  const payload = ticket.getPayload();
  return payload.sub;
}

exports.verify = verify;
