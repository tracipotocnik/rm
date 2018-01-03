<!-- src/components/Shippers.vue -->

<template>
  <div class="grid-container">
    <div class="grid-x">
      <div class="cell">
        <div class="card">
          <h2 class="card__heading">Load Dashboard</h2>
          <p>View and track all of your goods ></p>
          <input type="number" placeholder="Enter Load ID #">
          <p><strong>Most Recent Load ID:</strong> 3501</p>
          <div class="card__details">
            <p>Status: <strong>Waiting</strong></p>
            <h3 class="card__detail-title">Metal Car Parts</h3>
            <div class="card__sub-details">
              <p class="card__detail-item">
                Distance: 714 mi
              </p>
              <p class="card__detail-item">
                Age: 8 Days
              </p>
              <p class="card__detail-item">
                $1,460
              </p>
            </div>
          </div>
          <div class="card__locations">
            <div class="card__location-item">
              <p class="card__location-title">
                Voorheesville, NY
              </p>
              <p>Pick Up Window</p>
              <p>Thu 11/23</p>
              <p>03:22 - 11:22</p>
            </div>
            <div class="card__location-item">
              <p class="card__location-title">
                Cincinnati, OH
              </p>
              <p>Delivery Window</p>
              <p>Tue 11/28</p>
              <p>03:22 - 11:22</p>
            </div>
          </div>
          <google-map></google-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../js/auth';
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
    methods: {
      submit() {
        const credentials = {
          username: this.credentials.username,
          password: this.credentials.password,
        };
        // We need to pass the component's this context
        // to properly make use of http in the auth service
        auth.login(this, credentials, { name: 'home' });
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
