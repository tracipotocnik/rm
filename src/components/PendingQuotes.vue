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
              </div>
            </div>
            <div class="grid-x grid-margin-x">
              <div class="cell" v-if="error">
                <p>{{ error }}</p>
              </div>
              <table class="table">
                <thead>
                  <th class="align-left">Load ID</th>
                  <th class="align-left">Commodity &amp; Description</th>
                  <th>Date Uploaded</th>
                  <th>Price Quote</th>
                  <th>Approve / Reject</th>
                </thead>
                <tr v-for="(load, index) in loads">
                  <td class="align-left">
                    {{ load.Id }}
                  </td>
                  <td class="align-left">
                    {{ load.LoadDetails.CommodityType }},
                    {{ load.Description }}
                  </td>
                  <td>
                    <span class="no-wrap">{{ load.LastUpdatedUTC | dateShort }}</span>
                  </td>
                  <td>
                    {{ load.Rate.ShipperTotal | currency }}
                  </td>
                  <td>
                    <strong v-if="load.statusMessage">
                      {{ load.statusMessage }}
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
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
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
            if (response.body.status === 'true') {
              this.loads[currentIndex].statusMessage = 'Approved';
            } else {
              this.loads[currentIndex].statusMessage = 'Rejected';
            }
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
