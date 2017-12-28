const buffer = require('buffer/').Buffer;

export default {
  setBasicAuthentication(creds) {
    const base64credentials = buffer.from(`${creds.username}:${creds.password}`).toString('base64');
    return base64credentials;
  },
};
