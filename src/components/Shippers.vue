<!-- src/components/Shippers.vue -->

<template>
  <div class="grid-container">
    <div class="grid-x">
      <div class="cell">
        <div class="panels-wrapper">
          <div class="panel-container">
            <div class="panel">
              <div class="panel__top">
                <h2 class="panel__heading">Load Dashboard</h2>
                <p class="panel__subheading">
                  <router-link :to="{ name: 'loads'}">
                    View and track all of your goods
                    <svg width="7px" height="11px" viewBox="0 0 7 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g id="Shipper-Logged-In" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-326.000000, -242.000000)" stroke-linecap="square">
                        <g id="Load-Dashboard" transform="translate(50.000000, 162.000000)" stroke="currentColor">
                          <g id="Load-Dashboard-Info" transform="translate(0.000000, 22.000000)">
                            <g id="Header" transform="translate(29.000000, 0.000000)">
                              <g id="View-All" transform="translate(10.000000, 53.000000)">
                                <g id="Arrow" transform="translate(238.000000, 5.000000)">
                                  <path d="M0.277777778,0.333333333 L4.45369344,5.34443213" id="Line"></path>
                                  <path d="M4.72715502,5.33610803 L0.541969834,10.3472068 L4.72715502,5.33610803 Z" id="Line"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </router-link>
                </p>
              </div>
              <div class="panel__filter" v-if="!noLoadsFound">
                <input type="text"
                  placeholder="Enter Load ID #"
                  @keyup.enter="findLoad"
                  v-model="loadId">
                <p class="panel__filter-title" v-if="load">
                  <strong>Most Recent Load ID:</strong> {{ load.Id }}
                </p>
              </div>
              <div class="panel__details">
                <p v-if="error">{{ error }}</p>
                <p v-if="!load && !loadError && !noLoadsFound">
                  <img src="../assets/img/search-spinner.gif" class="loading-gif">
                </p>
                <p v-if="noLoadsFound"><strong>No loads found.</strong></p>
                <p v-if="!load && loadError">Load not found.</p>
                <load-info
                  v-if="load"
                  :status="loadState(load.LoadState)"
                  :title="load.Description"
                  :commodity="load.LoadDetails.CommodityType"
                  :distance="load.DistanceM"
                  :age="load.AgeHrs"
                  :price="load.Rate.ShipperTotal"
                  :pickupCity="load.Pickup.Address.locality"
                  :pickupState="load.Pickup.Address.regionCode"
                  :pickupDateStart="load.PickupWindowStartUTC"
                  :pickupDateEnd="load.PickupWindowEndUTC"
                  :pickupTimeZone="load.Pickup.TimeZone"
                  :dropoffCity="load.Dropoff.Address.locality"
                  :dropoffState="load.Dropoff.Address.regionCode"
                  :dropoffDateStart="load.DropoffWindowStartUTC"
                  :dropoffDateEnd="load.DropoffWindowEndUTC"
                  :dropoffTimeZone="load.Dropoff.TimeZone"
                ></load-info>
              </div>
              <google-map
                v-if="load"
                name="dashboard"
                :startLatitude="load.Pickup.LatDD"
                :startLongitude="load.Pickup.LonDD"
                :endLatitude="load.Dropoff.LatDD"
                :endLongitude="load.Dropoff.LonDD"
              ></google-map>
              <div class="panel__button" v-if="load">
                <router-link
                  :to="{ name: 'singleLoad', params: {id: load.Uuid} }"
                  class="button button--dark">Track</router-link>
              </div>
            </div>
          </div>
          <div class="panel-container">
            <div class="panel">
              <div class="panel__top">
                <h2 class="panel__heading">Shipment Uploads</h2>
                <p class="panel__subheading">
                  <router-link
                    :to="{ name: 'shipmentUploads' }">
                    View all
                    <svg width="7px" height="11px" viewBox="0 0 7 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g id="Shipper-Logged-In" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-326.000000, -242.000000)" stroke-linecap="square">
                        <g id="Load-Dashboard" transform="translate(50.000000, 162.000000)" stroke="currentColor">
                          <g id="Load-Dashboard-Info" transform="translate(0.000000, 22.000000)">
                            <g id="Header" transform="translate(29.000000, 0.000000)">
                              <g id="View-All" transform="translate(10.000000, 53.000000)">
                                <g id="Arrow" transform="translate(238.000000, 5.000000)">
                                  <path d="M0.277777778,0.333333333 L4.45369344,5.34443213" id="Line"></path>
                                  <path d="M4.72715502,5.33610803 L0.541969834,10.3472068 L4.72715502,5.33610803 Z" id="Line"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </router-link>
                </p>
              </div>
              <div class="panel__main panel__main--shipping"></div>
              <div class="panel__button">
                <input type="file" id="csvUpload" class="hidden" multiple>
                <button type="button" class="button button--dark button--csv" @click="uploadFiles" accept=".csv">Upload CSV</button>
              </div>
            </div>
          </div>
          <div class="panel-container">
            <div class="panel">
              <div class="panel__top">
                <h2 class="panel__heading">Pending Quotes</h2>
                <p class="panel__subheading">
                  <router-link
                    :to="{ name: 'pendingQuotes' }">
                    View all
                    <svg width="7px" height="11px" viewBox="0 0 7 11" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g id="Shipper-Logged-In" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-326.000000, -242.000000)" stroke-linecap="square">
                        <g id="Load-Dashboard" transform="translate(50.000000, 162.000000)" stroke="currentColor">
                          <g id="Load-Dashboard-Info" transform="translate(0.000000, 22.000000)">
                            <g id="Header" transform="translate(29.000000, 0.000000)">
                              <g id="View-All" transform="translate(10.000000, 53.000000)">
                                <g id="Arrow" transform="translate(238.000000, 5.000000)">
                                  <path d="M0.277777778,0.333333333 L4.45369344,5.34443213" id="Line"></path>
                                  <path d="M4.72715502,5.33610803 L0.541969834,10.3472068 L4.72715502,5.33610803 Z" id="Line"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </router-link>
                </p>
              </div>
              <div class="panel__main panel__main--pending"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GoogleMap from './GoogleMap';
  import LoadInfo from './LoadInfo';

  import loads from '../js/loads';
  import loadStates from '../js/loadStates';
  import shipments from '../js/shipmentUploads';
  import userInfo from '../js/user';
  import router from '../js/router';

  export default {
    data() {
      return {
        error: '',
        loads: '',
        load: '',
        loadId: '',
        loadError: false,
        noLoadsFound: false,
        shipments: [],
        user: '',
      };
    },
    components: {
      GoogleMap,
      LoadInfo,
    },
    beforeCreate() {
      document.body.className = 'page--shippers';
    },
    mounted() {
      loads.getLoads(this);
      userInfo.getUserInfo(this);
      shipments.getShipments(this);

      document.querySelector('#csvUpload').addEventListener('change', (event) => {
        const filesArray = event.target.files;
        shipments.convertAddShipment(
          filesArray,
          this.user.Id,
          this.user.ContactInfo.Name,
          this.user.CompanyId,
          this,
        );
        event.target.value = null;
        router.push({ name: 'shipmentUploads' });
        return false;
      });
    },
    methods: {
      findLoad() {
        const currentLoadId = parseInt(this.loadId, 10);
        this.load = loads.findLoad(this.loads, currentLoadId);
        if (!this.load) {
          this.loadError = true;
        } else {
          this.loadError = false;
        }
      },
      loadState(state) {
        return loadStates.convertLoadState(state);
      },
      uploadFiles() {
        document.querySelector('#csvUpload').click();
      },
    },
  };
</script>

<style lang="scss">
  .page--login {
    background: url('../assets/img/main-bg.jpg') no-repeat;
    background-size: cover;
  }
</style>
