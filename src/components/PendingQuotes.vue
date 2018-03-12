<!-- src/components/PendingQuotes.vue -->

<template>
  <div class="grid-container">
    <div class="grid-x">
      <div class="cell">
        <section class="dashboard">
          <div class="dashboard__content">
            <div class="dashboard__top">
              <div class="dashboard__heading">
                <h1 class="dashboard__title">Pending Price Quotes</h1>
                <div class="dashboard__heading__buttons">
                  <router-link :to="{ name: 'shippers'}"
                    class="button button--auto-width">
                    <svg width="7px" height="11px" viewBox="0 0 7 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g id="Welcome" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
                        <g id="Shipper-Logged-In_Scroll" transform="translate(-1172.000000, -242.000000)" stroke="currentColor">
                          <g id="Load-Dashboard-Copy-3" transform="translate(1063.000000, 162.000000)">
                            <g id="Load-Dashboard-Info" transform="translate(0.000000, 22.000000)">
                              <g id="Header" transform="translate(29.000000, 0.000000)">
                                <g id="View-All" transform="translate(10.000000, 53.000000)">
                                  <g id="Arrow" transform="translate(73.500000, 10.500000) rotate(180.000000) translate(-73.500000, -10.500000) translate(71.000000, 5.000000)">
                                    <path d="M0.277777778,0.333333333 L4.45369344,5.34443213" id="Line"></path>
                                    <path d="M4.72715502,5.33610803 L0.541969834,10.3472068 L4.72715502,5.33610803 Z" id="Line"></path>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    Back
                  </router-link>
                </div>
              </div>
            </div>
            <div class="grid-x grid-margin-x">
              <div class="cell" v-if="error">
                <p>{{ error }}</p>
              </div>
              <table class="table">
                <thead>
                  <th class="align-left">Load ID</th>
                  <th class="align-left">Commodity &amp; Customer Reference</th>
                  <th>Date Uploaded</th>
                  <th>Price Quote</th>
                  <th>Tender / Reject</th>
                </thead>
                <tr v-for="(load, index) in loads">
                  <td class="align-left">
                    {{ load.Id }}
                  </td>
                  <td class="align-left">
                    {{ load.LoadDetails.CommodityType }},
                    {{ load.CustomerReferenceNumber }}
                  </td>
                  <td>
                    <span class="no-wrap">{{ load.LastUpdatedUTC | dateShort }}</span>
                  </td>
                  <td>
                    {{ load.Rate.ShipperTotal | currency }}
                  </td>
                  <td>
                    <strong v-if="load.statusMessage">
                      <span v-if="load.statusMessage === 'true'" class="text-green">
                        Tendered
                      </span>
                      <span v-else class="text-red">
                        Rejected
                      </span>
                    </strong>
                    <div v-else class="no-wrap">
                      <button
                        class="button button--red button--small"
                        @click="approveRejectLoad(load, index, false)">
                        Reject
                      </button>
                      <button
                        class="button button--green button--small"
                        @click="approveRejectLoad(load, index, true)">
                        Tender
                      </button>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="dashboard__bottom">
            <p class="text-legal">By approving these quotes, you are agreeing
              to the RouteMarket
              <a target="_blank" href="https://api.routemarket.com:8443/shipper-terms-of-use.html">
                Shipper Terms of Use</a>,
              and agree to ship this
              freight with a RouteMarket carrier for our quoted rate.</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueResource from 'vue-resource';

  import * as constants from '../js/constants';
  import loads from '../js/loads';
  import utils from '../js/utilities/utils';
  import auth from '../js/utilities/auth';

  Vue.use(VueResource);

  export default {
    data() {
      return {
        error: '',
        loads: [],
        approveRejectText: '',
      };
    },
    mounted() {
      const COMPANY_ID = auth.getCompanyID();
      loads.getPendingLoads(this, COMPANY_ID);
    },
    methods: {
      approveRejectLoad(currentLoad, currentIndex, isApproved) {
        const API_URL = constants.APP_BACKEND_URL + constants.API_VERSION;
        const pendingLoadUrl = `${API_URL}/pricing/approval`;
        const USER_CREDS = auth.getUserCreds();
        const COMPANY_ID = auth.getCompanyID();
        Vue.http.post(pendingLoadUrl, '', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${USER_CREDS}`,
          },
          params: {
            loadUuid: currentLoad.Uuid,
            approved: isApproved,
            companyId: COMPANY_ID,
          },
        })
          .then(response => utils.handleErrors(response))
          .then((response) => {
            this.loads[currentIndex].statusMessage = response.body.status;
            this.$forceUpdate();
          })
          .catch((error) => {
            if (error.message) {
              this.error = error.message;
            } else if (!error.ok && error.bodyText) {
              this.error = error.bodyText;
            }
          });
      },
    },
  };
</script>
