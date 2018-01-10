import * as constants from './constants';

export default {
  convertLoadState(state) {
    if (
      state === 'NEW' ||
      state === 'PRICED' ||
      state === 'SCHEDULABLE' ||
      state === 'ROUTEDGENERATED') {
      return constants.ShipperStates.WAITING;
    } else if (
      state === 'ROUTEDAPPROVED' ||
      state === 'CARRIERLOADAGREEMENTSIGNED') {
      return constants.ShipperStates.ASSIGNED;
    } else if (
      state === 'CARRIERBOLSIGNED' ||
      state === 'INTRANSIT' ||
      state === 'LOSTDESTROYED') {
      return constants.ShipperStates.PICKED_UP;
    } else if (
      state === 'DELIVERED' ||
      state === 'DELIVEREDCONFIRMED' ||
      state === 'SHIPPERINVOICED' ||
      state === 'CARRIERPAID') {
      return constants.ShipperStates.DELIVERED;
    } else if (
      state === 'SHIPPERPAID' ||
      state === 'LOADCOMPLETED') {
      return constants.ShipperStates.PAID;
    }
    return 'Assigned';
  },
};
