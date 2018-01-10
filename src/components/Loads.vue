<!-- src/components/Loads.vue -->

<template>
  <div class="grid-container">
    <div class="grid-x">
      <div class="cell">
        <section class="dashboard">
          <div class="dashboard__top">
            <div class="dashboard__heading">
              <h1 class="dashboard__title">Load Dashboard</h1>
              <input type="text"
                placeholder="Enter Load ID #"
                v-model="loadId"
                v-on:keyup="onLoadIdFilter">
            </div>
            <ul class="dashboard__tabs">
              <li class="dashboard__tab-item">
              <li class="dashboard__tab-item" v-for="state in shipperStates">
                <a href="#"
                  @click.prevent="onStateClick(state)"
                  :class="{ active: state === filteredState }">
                  {{ state }}
                </a>
              </li>
            </ul>
          </div>
          <div class="grid-x grid-margin-x">
            <div class="cell" v-if="error">
              <p>{{ error }}</p>
            </div>
            <div class="medium-6 large-4 cell" v-for="load in filteredLoads">
              <div class="load-card">
                <load-info
                  :id="load.Id"
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
                <div class="load-card__button">
                  <router-link
                    :to="{ name: 'singleLoad', params: {id: load.Uuid} }"
                    class="button button--dark">View</router-link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import LoadInfo from './LoadInfo';

  import * as constants from '../js/constants';
  import loads from '../js/loads';
  import loadStates from '../js/loadStates';

  export default {
    data() {
      return {
        error: '',
        loads: [],
        loadId: '',
        filteredState: '',
        shipperStates: constants.ShipperStates,
      };
    },
    components: {
      LoadInfo,
    },
    mounted() {
      loads.getLoads(this);
    },
    methods: {
      onLoadIdFilter() {
        this.filteredState = '';
      },
      onStateClick(state) {
        this.filteredState = state;
      },
    },
    computed: {
      filteredLoads() {
        if (this.loads && this.loads.length) {
          if (this.filteredState) {
            return this.loads.filter(load =>
              loadStates.convertLoadState(load.LoadState) === this.filteredState);
          }
          return this.loads.filter(load => load.Id.toString().toLowerCase()
            .includes(this.loadId.toString().toLowerCase()));
        }
        return this.loads;
      },
    },
  };
</script>
