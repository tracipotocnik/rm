<!-- src/components/Loads.vue -->

<template>
  <div>
    <div class="popup">
      <div class="popup__box">
        <div class="popup__content">
          <h2 class="popup__title">Are You Sure?</h2>
          <p class="popup__body">Removing this load card will delete its information
          from your Dashboard.</p>
        </div>
        <div class="popup__button-group">
          <button class="popup__button" @click="closePopup">Cancel</button>
          <button class="popup__button" @click="removeLoad">Confirm</button>
        </div>
      </div>
    </div>
    <div class="grid-container">
      <div class="grid-x">
        <div class="cell">
          <section class="dashboard">
            <div class="dashboard__content">
              <div class="dashboard__top">
                <div class="dashboard__heading">
                  <h1 class="dashboard__title">Load Dashboard</h1>
                  <input type="text"
                    placeholder="Enter Load ID #"
                    v-model="loadId"
                    v-on:keyup="onLoadIdFilter">
                </div>
                <div class="dashboard__tabs-wrapper">
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
              </div>
              <div class="grid-x grid-margin-x">
                <div class="cell" v-if="error">
                  <p>{{ error }}</p>
                </div>
                <div class="cell" v-if="!filteredLoads.length && !loadError">
                  <p>{{ loadingMessage }}</p>
                </div>
                <div class="cell" v-if="!filteredLoads && loadError">
                  <p>{{ noLoadMessage }}</p>
                </div>
                <div class="medium-6 large-4 cell" v-for="(load, index) in filteredLoads">
                  <div class="load-card">
                    <load-info
                      :id="load.Id"
                      :title="load.Description"
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
                    <div class="load-card__button">
                      <router-link
                        :to="{ name: 'singleLoad', params: {id: load.Uuid} }"
                        class="button button--dark">View</router-link>
                    </div>
                    <a v-if="loadState(load.LoadState) === 'Waiting'"
                      href="#"
                      class="load-card__remove"
                      @click.prevent="openPopup(load, index, $event)">
                      Remove
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
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
        filteredState: 'Waiting',
        shipperStates: constants.ShipperPageTypes,
        loadingMessage: 'Loading...',
        noLoadMessage: 'No results found.',
        loadError: false,
        currentLoad: '',
        currentIndex: '',
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
      loadState(state) {
        return loadStates.convertLoadState(state);
      },
      openPopup(load, index, event) {
        this.currentLoad = load;
        this.currentIndex = index;
        event.target.closest('.load-card').classList.add('selected');
        document.body.classList.add('popup-open');
      },
      closePopup() {
        document.querySelector('.load-card.selected').classList.remove('selected');
        this.currentLoad = '';
        this.currentIndex = '';
        document.body.classList.remove('popup-open');
      },
      removeLoad() {
        this.$delete(this.loads, this.currentIndex);
        loads.removeLoad(this, this.currentLoad);
        this.closePopup();
      },
    },
    computed: {
      filteredLoads() {
        if (this.loads && this.loads.length) {
          let filteredLoads = '';
          if (this.filteredState) {
            filteredLoads = this.loads.filter(load =>
              loadStates.convertLoadState(load.LoadState) === this.filteredState);
          } else {
            filteredLoads = this.loads.filter(load => load.Id.toString().toLowerCase()
              .includes(this.loadId.toString().toLowerCase()));
          }
          if (filteredLoads.length > 0) {
            this.loadError = false;
            return filteredLoads;
          }
          this.loadError = true;
          return false;
        }
        return this.loads;
      },
    },
  };
</script>
