import Vue from 'vue';
import VueResource from 'vue-resource';

import * as constants from './constants';
import utils from './utilities/utils';
import auth from './utilities/auth';

Vue.use(VueResource);

// URL and endpoint constants
const API_URL = `${constants.APP_BACKEND_URL}${constants.API_VERSION}`;
const SHIPMENTS_URL = '/load/templateupload/all?companyId=';
const SHIPMENTS_SUBMIT_URL = '/load/templateupload';

export default {
  getShipments(context) {
    const COMPANY_ID = auth.getCompanyID();
    const USER_CREDS = auth.getUserCreds();
    const shipmentQueryUrl = API_URL + SHIPMENTS_URL + COMPANY_ID;
    Vue.http.get(shipmentQueryUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${USER_CREDS}`,
      },
    })
      .then(response => utils.handleErrors(response))
      .then((response) => {
        console.log(response.body); // eslint-disable-line no-console
        context.shipments = response.body;
      })
      .catch((error) => {
        if (error.message) {
          context.error = error.message;
        } else if (!error.ok && error.bodyText) {
          context.error = error.bodyText;
        }
      });
  },
  submitShipment(context, fileData) {
    const USER_CREDS = auth.getUserCreds();
    const USER_UUID = auth.getUserUUID();
    const COMPANY_ID = auth.getCompanyID();
    const submitShipmentUrl = API_URL + SHIPMENTS_SUBMIT_URL;
    Vue.http.post(submitShipmentUrl, fileData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${USER_CREDS}`,
      },
      params: {
        userUuid: USER_UUID,
        shipperId: COMPANY_ID,
      },
    })
      .then(response => utils.handleErrors(response))
      .then((response) => {
        console.log(response.body); // eslint-disable-line no-console
        context.shipments.push(response.body);
        context.$forceUpdate();
        console.log(context.shipments); // eslint-disable-line no-console
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
        if (error.message) {
          context.error = error.message;
        } else if (!error.ok && error.bodyText) {
          context.error = error.bodyText;
        }
      });
  },
};
