const header = {
  alg: 'HS256',
  typ: 'JWT',
};

const payload = {
  username: 'user1@user.com',
  name: 'Jose Silva',
  exp: new Date().getTime(),
};

const key = 'abcd123456';

const base64Url = require('base64-url');

//const headerEncoded = Buffer.from(JSON.stringify(header)).toString('base64');
const headerEncoded = base64Url.encode(JSON.stringify(header));
//const payloadEncoded = Buffer.from(JSON.stringify(payload)).toString('base64');
const payloadEncoded = base64Url.encode(JSON.stringify(payload));

const crypt = require('crypto');

const signature = crypt
    .createHmac('sha256', key)
    .update(`${headerEncoded}.${payloadEncoded}`)
    .digest('bin');

const signatureEncoded = base64Url.encode(signature);

console.log(headerEncoded, payloadEncoded);
console.log((`${headerEncoded}.${payloadEncoded}.${signatureEncoded}`))
console.log(signature);
