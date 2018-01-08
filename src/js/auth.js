import Vue from 'vue';
import VueResource from 'vue-resource';

import * as constants from './constants';
import utils from './utilities/utils';
import auth from './utilities/auth';
import router from './router';

Vue.use(VueResource);

// URL and endpoint constants
const API_URL = `${constants.APP_BACKEND_URL}${constants.API_VERSION}`;
const LOGIN_URL = '/user/testAuthentication?username=';
const USER_URL = '/user?username=';

export default {
  // User object will let us check authentication status
  user: {
    creds: auth.getUserCreds(),
  },

  login(context, creds) {
    const loginQueryUrl = API_URL + LOGIN_URL + creds.username;
    const userQueryUrl = API_URL + USER_URL + creds.username;

    Vue.http.get(loginQueryUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${auth.setBasicAuthentication(creds)}`,
      },
    })
      .then(response => utils.handleErrors(response))
      .then((response) => {
        auth.clearUserCreds();
        auth.clearUserUUID();
        this.user.creds = auth.setBasicAuthentication(creds);
        auth.setUserCreds(this.user.creds);
        auth.setUserUUID(response.body.content);

        Vue.http.get(userQueryUrl, {
          headers: {
            Accept: 'application/json',
            Authorization: `Basic ${this.user.creds}`,
          },
        })
          .then(user => utils.handleErrors(user))
          .then((user) => {
            if (user.body.UserType === 'CARRIER') {
              router.push({ name: 'carriers' });
            } else {
              router.push({ name: 'shippers' });
            }
          })
          .catch((error) => {
            if (error.message) {
              context.error = error.message;
            } else if (!error.ok && error.bodyText) {
              context.error = error.bodyText;
            }
          });
      })
      .catch((error) => {
        if (error.message) {
          context.error = error.message;
        } else if (!error.ok && error.bodyText) {
          context.error = error.bodyText;
        }
      });
  },

  isLoggedIn() {
    let authenticated = false;
    if (this.user.creds) {
      authenticated = true;
    }
    return authenticated;
  },

  logout() {
    auth.clearUserCreds();
    window.location.href = '/';
  },
};
