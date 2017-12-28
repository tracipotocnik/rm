<!-- src/components/Login.vue -->

<template>
  <div class="grid-container">
    <div class="grid-x">
      <div class="cell text-center">
        <div class="box">
          <h1>Log In</h1>
          <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              v-model="credentials.username"
            >
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="credentials.password"
            >
          </div>
          <button class="button" @click="submit()">Log In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../js/auth';

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
    beforeCreate() {
      document.body.className = 'page--login';
    },
    methods: {
      submit() {
        const credentials = {
          username: this.credentials.username,
          password: this.credentials.password,
        };
        // We need to pass the component's this context
        // to properly make use of http in the auth service
        auth.login(this, credentials);
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
