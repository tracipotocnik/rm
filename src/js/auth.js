import * as constants from './constants';
import utils from './utilities/utils';
import auth from './utilities/auth';
import router from './router';

// URL and endpoint constants
const API_URL = `${constants.APP_BACKEND_URL}${constants.API_VERSION}`;
const LOGIN_URL = '/user/testAuthentication?username=';

export default {
  // User object will let us check authentication status
  user: {
    creds: auth.getUserCreds(),
  },

  login(context, creds, redirect) {
    const url = API_URL + LOGIN_URL + creds.username;

    fetch(url, {
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${auth.setBasicAuthentication(creds)}`,
      },
    })
      .then(response => utils.handleErrors(response))
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson); // eslint-disable-line no-console

        auth.clearUserCreds();
        this.user.creds = auth.setBasicAuthentication(creds);
        auth.setUserCreds(this.user.creds);

        if (redirect) {
          router.go(redirect);
        }
      })
      .catch((error) => {
        context.error = error.message;
      });

    // auth.clearUserCreds();
    // this.user.creds = auth.setBasicAuthentication(creds);
    // auth.setUserCreds(this.user.creds);
    // console.log(context); // eslint-disable-line no-console
    // if (redirect) {
    //   router.push(redirect);
    // }
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

  requireAuth(to, from, next) {
    if (!this.isLoggedIn()) {
      next({
        path: '/',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  },
};
