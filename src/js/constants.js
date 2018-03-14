/* Eventually, want to load from config file, and possibly load on startup
from a REST endpoitn (so can change info on fly, possibly just do CodePush)
REST: ConfigurationController
*/

export const HOCKEY_APP_ID = '156bf57806e9474fa2e4c55c27c004d7';

// AWS app backend load balancer, HTTPS
export const APP_BACKEND_URL = 'https://api-test.routemarket.com:8443';

export const API_VERSION = '/v1';

export const ShipperPageTypes = {
  SHIPPER_WAITING: 'Waiting',
  SHIPPER_INTRANSIT: 'In Transit',
  SHIPPER_DELIVERED: 'Delivered',
  SHIPPER_COMPLETED: 'Completed',
};
