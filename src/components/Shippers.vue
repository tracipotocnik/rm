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
                    View and track all of your goods <img src="../assets/img/caret-right.svg">
                  </router-link>
                </p>
              </div>
              <div class="panel__filter">
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
                <p v-if="!load && !loadError">{{ loadingMessage }}</p>
                <p v-if="!load && loadError">{{ noLoadMessage }}</p>
                <load-info
                  v-if="load"
                  :status="loadState(load.LoadState)"
                  :title="load.Description"
                  :distance="load.DistanceM"
                  :time="load.AgeHrs"
                  :price="load.Rate.ShipperTotal"
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
                    View all <img src="../assets/img/caret-right.svg">
                  </router-link>
                </p>
              </div>
              <div class="panel__main panel__main--shipping"></div>
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

  export default {
    data() {
      return {
        error: '',
        loads: '',
        load: '',
        loadId: '',
        loadingMessage: 'Loading...',
        noLoadMessage: 'Load ID not found.',
        loadError: false,
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
    },
  };
</script>

<style lang="scss">
  .page--login {
    background: url('../assets/img/main-bg.jpg') no-repeat;
    background-size: cover;
  }
</style>
