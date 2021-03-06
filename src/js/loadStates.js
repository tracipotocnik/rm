import * as constants from './constants';

export default {
  convertLoadState(state) {
    if (
      state === 'NEW' ||
      state === 'PRICED' ||
      state === 'SCHEDULABLE' ||
      state === 'SCHEDULABLE_PENDING') {
      return constants.ShipperPageTypes.SHIPPER_WAITING;
    } else if (
      state === 'ROUTEDAPPROVED' ||
      state === 'CARRIERLOADAGREEMENTSIGNED' ||
      state === 'CARRIERBOLSIGNED' ||
      state === 'INTRANSIT' ||
      state === 'ROUTEDGENERATED') {
      return constants.ShipperPageTypes.SHIPPER_INTRANSIT;
    } else if (
      state === 'DELIVERED' ||
      state === 'DELIVEREDCONFIRMED' ||
      state === 'SHIPPERINVOICED' ||
      state === 'CARRIERPAID') {
      return constants.ShipperPageTypes.SHIPPER_DELIVERED;
    } else if (
      state === 'LOSTDESTROYED' ||
      state === 'SHIPPERPAID' ||
      state === 'LOADCOMPLETED') {
      return constants.ShipperPageTypes.SHIPPER_COMPLETED;
    }
    return 'N/A';
  },
};
