<!-- src/components/SingleLoad.vue -->

<template>
  <div class="grid-container">
    <div class="grid-x">
      <div class="cell">
        <section class="dashboard">
          <div class="grid-x grid-margin-x">
            <div class="cell" v-if="error">
              <p>{{ error }}</p>
            </div>
            <div class="medium-6 large-4 cell">
              <div class="load-card" v-if="load">
                <load-info
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
        error: '',
        load: '',
      };
    },
    components: {
      LoadInfo,
    },
    mounted() {
      loads.getSingleLoad(this, this.$route.params.id);
    },
  };
</script>
