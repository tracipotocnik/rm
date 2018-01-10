import Vue from 'vue';
import VueResource from 'vue-resource';

import * as constants from './constants';
import utils from './utilities/utils';
import auth from './utilities/auth';

Vue.use(VueResource);

// URL and endpoint constants
const API_URL = `${constants.APP_BACKEND_URL}${constants.API_VERSION}`;
const LOAD_URL = '/load/allLoads?isShipper=true&userUuid=';
const SINGLE_LOAD_URL = '/load/?loadUuid=';

export default {
  getLoads(context) {
    const USER_UUID = auth.getUserUUID();
    const USER_CREDS = auth.getUserCreds();
    const loadQueryUrl = API_URL + LOAD_URL + USER_UUID;
    Vue.http.get(loadQueryUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${USER_CREDS}`,
      },
    })
      .then(response => utils.handleErrors(response))
      .then((response) => {
        context.loads = response.body;
        context.load = response.body.slice(-1)[0]; // eslint-disable-line prefer-destructuring
      })
      .catch((error) => {
        if (error.message) {
          context.error = error.message;
        } else if (!error.ok && error.bodyText) {
          context.error = error.bodyText;
        }
      });
  },

  findLoad(loadsArray, loadId) {
    const load = loadsArray.filter(e => e.Id === loadId);
    return load[0];
  },

  getSingleLoad(context, loadUuid) {
    const USER_CREDS = auth.getUserCreds();
    const loadQueryUrl = API_URL + SINGLE_LOAD_URL + loadUuid;
    Vue.http.get(loadQueryUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${USER_CREDS}`,
      },
    })
      .then(response => utils.handleErrors(response))
      .then((response) => {
        console.log(response); // eslint-disable-line no-console
        context.load = response.body;
      })
      .catch((error) => {
        if (error.message) {
          context.error = error.message;
        } else if (!error.ok && error.bodyText) {
          context.error = error.bodyText;
        }
      });
  },
};
