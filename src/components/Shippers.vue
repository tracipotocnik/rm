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
              <div class="panel__details" v-if="load">
                <p v-if="error">{{ error }}</p>
                <load-info
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
            </div>
          </div>
          <div class="panel-container">
            <div class="panel">
              <div class="panel__top">
                <h2 class="panel__heading">Shipment Uploads</h2>
                <p class="panel__subheading"><a href="#">
                  View all <img src="../assets/img/caret-right.svg"></a>
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
