import * as constants from './constants';
import utils from './utilities/utils';
import auth from './utilities/auth';
import router from './router';

// URL and endpoint constants
const API_URL = `${constants.APP_BACKEND_URL}${constants.API_VERSION}`;
const LOGIN_URL = `${API_URL}/user/testAuthentication?username=`;

export default {
  // User object will let us check authentication status
  user: {
    authenticated: false,
  },

  login(context, creds, redirect) {
    const url = `${LOGIN_URL}${creds.username}`;
    console.log(url); // eslint-disable-line no-console
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${auth.setBasicAuthentication(creds)}`,
      },
    })
      .then(utils.handleErrors(context))
      .then(response => response.json())
      .then((responseJson) => {
        console.log(responseJson); // eslint-disable-line no-console
        this.user.authenticated = true;

        if (redirect) {
          router.go(redirect);
        }
      })
      .catch((error) => {
        context.error = error.message;
      });
  },
};
