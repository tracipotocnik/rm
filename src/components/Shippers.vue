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
                <p class="panel__subheading"><a href="#">
                  View and track all of your goods <img src="../assets/img/caret-right.svg"></a>
                </p>
              </div>
              <div class="panel__filter">
                <input type="number" placeholder="Enter Load ID #">
                <p class="panel__filter-title">
                  <strong>Most Recent Load ID:</strong> 3501
                </p>
              </div>
              <div class="panel__details">
                <p class="panel__details__pretitle">Status: <strong>Waiting</strong></p>
                <h3 class="panel__details__title">Metal Car Parts</h3>
                <div class="panel__subdetails">
                  <p class="panel__subdetails__item">
                    Distance: 714 mi
                  </p>
                  <p class="panel__subdetails__item">
                    Age: 8 Days
                  </p>
                  <p class="panel__subdetails__item">
                    <strong>$1,460</strong>
                  </p>
                </div>
                <div class="panel__locations">
                  <div class="panel__locations__item">
                    <p class="panel__locations__title">
                      Voorheesville, NY
                    </p>
                    <p>Pick Up Window</p>
                    <p>Thu 11/23</p>
                    <p>03:22 - 11:22</p>
                  </div>
                  <div class="panel__locations__item">
                    <p class="panel__locations__title">
                      Cincinnati, OH
                    </p>
                    <p>Delivery Window</p>
                    <p>Tue 11/28</p>
                    <p>03:22 - 11:22</p>
                  </div>
                </div>
              </div>
              <google-map></google-map>
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

  export default {
    data() {
      return {
        // We need to initialize the component with any
        // properties that will be used in it
        credentials: {
          username: '',
          password: '',
        },
        error: '',
      };
    },
    components: {
      GoogleMap,
    },
    beforeCreate() {
      document.body.className = 'page--shippers';
    },
  };
</script>

<style lang="scss">
  .page--login {
    background: url('../assets/img/main-bg.jpg') no-repeat;
    background-size: cover;
  }
</style>
