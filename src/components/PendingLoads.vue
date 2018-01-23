<!-- src/components/PendingLoads.vue -->

<template>
  <div class="grid-container">
    <div class="grid-x">
      <div class="cell">
        <section class="dashboard">
          <div class="dashboard__content">
            <div class="dashboard__top">
              <div class="dashboard__heading">
                <h1 class="dashboard__title">Pending Load Price Quotes</h1>
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
                  <th>Date</th>
                  <th>Price Quote</th>
                  <th>Approve / Reject</th>
                </thead>
                <tr v-for="load in loads">
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
                    <button
                      class="button button--red"
                      @click="approveRejectLoad(load.Uuid, false)">
                      Reject
                    </button>
                    <button
                      class="button button--green"
                      @click="approveRejectLoad(load.Uuid, true)">
                      Approve
                    </button>
                    <p v-if="approveRejectText">
                      <strong>{{ approveRejectText }}</strong>
                    </p>
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
      loads.getPendingLoads(this, this.$route.params.companyUuid);
    },
    methods: {
      approveRejectLoad(id, isApproved) {
        const API_URL = constants.APP_BACKEND_URL + constants.API_VERSION;
        const pendingLoadUrl = `${API_URL}/pricing/approval`;
        const USER_CREDS = auth.getUserCreds();
        Vue.http.post(pendingLoadUrl, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${USER_CREDS}`,
          },
          params: {
            loadUuid: id,
            approved: isApproved,
            companyId: this.$route.params.companyId,
          },
        })
          .then(response => utils.handleErrors(response))
          .then((response) => {
            console.log(response.body); // eslint-disable-line no-console
            this.approveRejectText = response.body;
          })
          .catch((error) => {
            console.log(error); // eslint-disable-line no-console
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
