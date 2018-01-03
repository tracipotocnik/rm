const buffer = require('buffer/').Buffer;

const USER_CREDS = 'user_creds';

export default {
  setBasicAuthentication(creds) {
    const base64credentials = buffer.from(`${creds.username}:${creds.password}`).toString('base64');
    return base64credentials;
  },

  getUserCreds() {
    return localStorage.getItem(USER_CREDS);
  },

  clearUserCreds() {
    localStorage.removeItem(USER_CREDS);
  },

  setUserCreds(creds) {
    localStorage.setItem(USER_CREDS, creds);
  },
};
