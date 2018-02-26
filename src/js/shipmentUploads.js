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
    const loadingClass = 'is-loading';
    document.body.classList.add(loadingClass);
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
      .then(() => {
        document.body.classList.remove(loadingClass);
        window.location.reload();
      })
      .catch((error) => {
        if (error.message) {
          context.error = error.message;
        } else if (!error.ok && error.bodyText) {
          context.error = 'Error uploading file.';
        }
        document.body.classList.remove(loadingClass);
      });
  },

  // Convert and add shipment
  convertAddShipment(filesArray, userId, userName, companyId, context) {
    Array.from(filesArray).forEach((file) => {
      utils.getFileDataArray(file).then((data) => {
        const arrayBuffer = data;
        const unit8Array = new Uint8Array(arrayBuffer);
        const array = Array.from(unit8Array);

        const fileInfo = {
          FileName: file.name.substr(0, file.name.lastIndexOf('.')),
          UserId: userId,
          PosterName: userName,
          Extension: 'csv',
          CompanyId: companyId,
          Filedata: array,
        };

        this.submitShipment(context, fileInfo);
      });
    });
  },
};
