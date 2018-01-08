<!-- src/components/Loads.vue -->

<template>
  <div class="grid-container">
    <div class="grid-x">
      <div class="cell">
        <section class="dashboard">
          <div class="dashboard__top">
            <div class="dashboard__heading">
              <h1 class="dashboard__title">Load Dashboard</h1>
              <input type="number" placeholder="Enter Load ID #">
            </div>
            <ul class="dashboard__tabs">
              <li class="dashboard__tab-item">
                <a href="#" class="active">
                  Waiting
                </a>
              </li>
              <li class="dashboard__tab-item">
                <a href="#">
                  In Transit
                </a>
              </li>
              <li class="dashboard__tab-item">
                <a href="#">
                  Delivered
                </a>
              </li>
              <li class="dashboard__tab-item">
                <a href="#">
                  Complete
                </a>
              </li>
            </ul>
          </div>
          <div class="grid-x grid-margin-x">
            <div class="medium-6 large-4 cell" v-for="load in loads">
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
                  <a href="#" class="button button--dark">View</a>
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

  import loads from '../js/loads';

  export default {
    data() {
      return {
        loads: '',
      };
    },
    components: {
      LoadInfo,
    },
    mounted() {
      loads.getLoads(this);
    },
  };
</script>
