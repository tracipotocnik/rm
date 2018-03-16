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

console.log(API_URL); // eslint-disable-line no-console

export default {
  // User object will let us check authentication status
  user: {
    creds: auth.getUserCreds(),
    uuid: auth.getUserUUID(),
    companyId: auth.getCompanyID(),
    username: auth.getUsername(),
    userType: auth.getUserType(),
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
        auth.clearCompanyID();
        auth.clearUsername();
        auth.clearUserType();

        this.user.creds = auth.setBasicAuthentication(creds);
        this.user.uuid = response.body.content;
        this.user.username = creds.username;

        auth.setUserCreds(this.user.creds);
        auth.setUserUUID(this.user.uuid);
        auth.setUsername(this.user.username);

        Vue.http.get(userQueryUrl, {
          headers: {
            Accept: 'application/json',
            Authorization: `Basic ${this.user.creds}`,
          },
        })
          .then(user => utils.handleErrors(user))
          .then((user) => {
            this.user.userType = user.body.UserType;
            auth.setUserType(this.user.userType);

            if (this.user.userType === 'SHIPPER') {
              this.user.companyId = user.body.CompanyId;
              auth.setCompanyID(this.user.companyId);

              if (context.$route.query.dest) {
                router.push({ path: context.$route.query.dest });
                window.location.reload();
              } else {
                router.push({ name: 'shippers' });
              }
            } else {
              router.push({ name: 'carriers' });
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
    if (this.user.creds &&
        this.user.uuid &&
        this.user.companyId &&
        this.user.username &&
        this.user.userType) {
      authenticated = true;
    }
    return authenticated;
  },

  logout() {
    auth.clearUserCreds();
    auth.clearUserUUID();
    auth.clearCompanyID();
    auth.clearUsername();
    auth.clearUserType();
  },
};
