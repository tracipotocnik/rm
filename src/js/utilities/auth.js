const buffer = require('buffer/').Buffer;

const USER_CREDS = 'user_creds';
const USER_UUID = 'user_uuid';

export default {
  setBasicAuthentication(creds) {
    const base64credentials = buffer.from(`${creds.username}:${creds.password}`).toString('base64');
    return base64credentials;
  },

  getUserCreds() {
    return localStorage.getItem(USER_CREDS);
  },

  getUserUUID() {
    return localStorage.getItem(USER_UUID);
  },

  clearUserCreds() {
    localStorage.removeItem(USER_CREDS);
  },

  clearUserUUID() {
    localStorage.removeItem(USER_UUID);
  },

  setUserCreds(creds) {
    localStorage.setItem(USER_CREDS, creds);
  },

  setUserUUID(uuid) {
    localStorage.setItem(USER_UUID, uuid);
  },
};
