<!-- src/components/SingleLoad.vue -->

<template>
  <div class="grid-container">
    <div class="grid-x">
      <div class="cell">
        <section class="dashboard">
          <div class="dashboard__content">
            <div class="grid-x grid-margin-x">
              <div class="cell" v-if="single_error">
                <p>{{ single_error }}</p>
              </div>
              <div class="cell" v-if="location_error">
                <p>{{ location_error }}</p>
              </div>
              <div class="large-4 cell">
                <div class="load-card" v-if="load">
                  <load-info
                    isLarge=true
                    :id="load.Id"
                    :title="load.Description"
                    :pickupCity="load.Pickup.Address.locality"
                    :pickupState="load.Pickup.Address.regionCode"
                    :pickupDateStart="load.PickupWindowStartUTC"
                    :pickupDateEnd="load.PickupWindowEndUTC"
                    :dropoffCity="load.Dropoff.Address.locality"
                    :dropoffState="load.Dropoff.Address.regionCode"
                    :dropoffDateStart="load.DropoffWindowStartUTC"
                    :dropoffDateEnd="load.DropoffWindowEndUTC"
                  ></load-info>
                </div>
              </div>
              <div class="large-8 cell">
                <div class="summary" v-if="load">
                  <div class="summary__button">
                    <router-link :to="{ name: 'loads'}"
                      class="button button--small">
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
                  <div class="summary__column">
                    <div class="summary__section">
                      <h3 class="summary__title">Summary</h3>
                      <div class="summary__container">
                        <div class="summary__table">
                          <div class="summary__item">
                            <p class="summary__label">Status:</p>
                            <p class="summary__value">{{ loadState(load.LoadState) }}</p>
                          </div>
                          <div class="summary__item">
                            <p class="summary__label">Delivery Due:</p>
                            <p class="summary__value">{{ load.DropoffWindowStartUTC | date }}</p>
                          </div>
                          <div class="summary__item">
                            <p class="summary__label">Service Type:</p>
                            <p class="summary__value">{{ load.LoadDetails.ServiceType }}</p>
                          </div>
                          <div class="summary__item">
                            <p class="summary__label">Count &amp; Packing:</p>
                            <p class="summary__value">
                              {{ load.LoadDetails.PieceCount }}
                              {{ load.LoadDetails.PackageType }}
                            </p>
                          </div>
                          <div class="summary__item">
                            <p class="summary__label">Price:</p>
                            <p class="summary__value">{{ load.Rate.ShipperTotal | currency }}</p>
                          </div>
                          <div class="summary__item">
                            <p class="summary__label">Age:</p>
                            <p class="summary__value">{{ load.AgeHrs | time }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="summary__column">
                    <div class="summary__section">
                      <h3 class="summary__title">Load Details</h3>
                      <div class="summary__container">
                        <p class="summary__body">Freight Details (coming soon)</p>
                      </div>
                    </div>
                    <div class="summary__section">
                      <h3 class="summary__title">Contact &amp; Payment Information</h3>
                      <div class="summary__container">
                        <p class="summary__body">Contact Carrier (coming soon)</p>
                      </div>
                    </div>
                    <div class="summary__section">
                      <h3 class="summary__title">Distance</h3>
                      <div class="summary__container">
                        <p class="summary__body">{{ load.DistanceM | numberCommas }} mi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <google-map
            v-if="load"
            name="singleLoad"
            isTall="true"
            :startLatitude="load.Pickup.LatDD"
            :startLongitude="load.Pickup.LonDD"
            :midLatitude="loadLocation.Latitude"
            :midLongitude="loadLocation.Longitude"
            :endLatitude="load.Dropoff.LatDD"
            :endLongitude="load.Dropoff.LonDD"
          ></google-map>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import LoadInfo from './LoadInfo';
  import GoogleMap from './GoogleMap';

  import loads from '../js/loads';
  import loadStates from '../js/loadStates';

  export default {
    data() {
      return {
        load: '',
        loadLocation: '',
        error: '',
        single_error: '',
        location_error: '',
        refreshMapTimer: null,
      };
    },
    components: {
      GoogleMap,
      LoadInfo,
    },
    mounted() {
      loads.getSingleLoad(this, this.$route.params.id);
      loads.getLocation(this, this.$route.params.id);

      this.refreshMapTimer = setInterval(() => {
        loads.getLocation(this, this.$route.params.id);
      }, 5000);
    },
    beforeDestroy() {
      clearInterval(this.refreshMapTimer);
    },
    methods: {
      loadState(state) {
        return loadStates.convertLoadState(state);
      },
    },
  };
</script>
