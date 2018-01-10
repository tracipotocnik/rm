import * as constants from './constants';

export default {
  convertLoadState(state) {
    if (
      state === 'NEW' ||
      state === 'PRICED' ||
      state === 'SCHEDULABLE' ||
      state === 'ROUTEDGENERATED') {
      return constants.ShipperPageTypes.SHIPPER_WAITING;
    } else if (
      state === 'ROUTEDAPPROVED' ||
      state === 'CARRIERLOADAGREEMENTSIGNED' ||
      state === 'CARRIERBOLSIGNED' ||
      state === 'INTRANSIT') {
      return constants.ShipperPageTypes.SHIPPER_INTRANSIT;
    } else if (
      state === 'LOSTDESTROYED' ||
      state === 'DELIVERED' ||
      state === 'DELIVEREDCONFIRMED' ||
      state === 'SHIPPERINVOICED' ||
      state === 'CARRIERPAID') {
      return constants.ShipperPageTypes.SHIPPER_DELIVERED;
    } else if (
      state === 'SHIPPERPAID' ||
      state === 'LOADCOMPLETED') {
      return constants.ShipperPageTypes.COMPLETED;
    }
    return 'N/A';
  },
};
