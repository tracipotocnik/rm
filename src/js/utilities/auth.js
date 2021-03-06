const buffer = require('buffer/').Buffer;

const USER_CREDS = 'user_creds';
const USER_UUID = 'user_uuid';
const COMPANY_ID = 'company_id';
const USERNAME = 'username';
const USER_TYPE = 'user_type';

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

  getCompanyID() {
    return localStorage.getItem(COMPANY_ID);
  },

  getUsername() {
    return localStorage.getItem(USERNAME);
  },

  getUserType() {
    return localStorage.getItem(USER_TYPE);
  },

  clearUserCreds() {
    localStorage.removeItem(USER_CREDS);
  },

  clearUserUUID() {
    localStorage.removeItem(USER_UUID);
  },

  clearCompanyID() {
    localStorage.removeItem(COMPANY_ID);
  },

  clearUsername() {
    localStorage.removeItem(USERNAME);
  },

  clearUserType() {
    localStorage.removeItem(USER_TYPE);
  },

  setUserCreds(creds) {
    localStorage.setItem(USER_CREDS, creds);
  },

  setUserUUID(uuid) {
    localStorage.setItem(USER_UUID, uuid);
  },

  setCompanyID(companyID) {
    localStorage.setItem(COMPANY_ID, companyID);
  },

  setUsername(username) {
    localStorage.setItem(USERNAME, username);
  },

  setUserType(userType) {
    localStorage.setItem(USER_TYPE, userType);
  },
};
