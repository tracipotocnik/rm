<!-- src/components/Login.vue -->

<template>
  <div class="grid-container">
    <div class="grid-x">
      <div class="cell text-center">
        <div class="box">
          <h1>Log In</h1>
          <p v-if="error">{{ error }}</p>
          <div class="form-group">
            <input
              type="text"
              :class="{'error': errors.has('username') }"
              name="username"
              required
              placeholder="Username"
              v-model="credentials.username"
              v-validate="'required'"
            >
            <span v-show="errors.has('username')"
              class="error-message">{{ errors.first('username') }}</span>
          </div>
          <div class="form-group">
            <input
              type="password"
              :class="{'error': errors.has('password') }"
              name="password"
              required
              placeholder="Password"
              v-model="credentials.password"
              v-validate="'required'"
            >
            <span v-show="errors.has('password')"
              class="error-message">{{ errors.first('password') }}</span>
          </div>
          <button class="button" @click="submit()">Log In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VeeValidate from 'vee-validate';

  import auth from '../js/auth';

  Vue.use(VeeValidate);

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

        this.$validator.validateAll().then((result) => {
          if (result) {
            // We need to pass the component's this context
            // to properly make use of https in the auth service
            auth.login(this, credentials);
            return true;
          }
          return false;
        }).catch((error) => {
          this.error = error.bodyText;
          return false;
        });
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
