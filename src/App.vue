<!-- src/App.vue -->

<template>
  <div id="app">
    <header class="header">
      <a class="header__logo" href="/">
        <img class="header__logo__image" src="./assets/img/logo.png" alt="Route Market">
        <span class="header__logo__text">RouteMarket</span>
      </a>
      <nav class="header__nav">
        <ul class="nav">
          <li class="nav__item"><a href="https://routemarket.com" class="nav__link">Home</a></li>
          <li class="nav__item">
            <router-link
              :to="{ name: 'shippers'}"
              :class="{ nav__link: true,
                active: $route.name === 'loads' ||
                  $route.name === 'shipmentUploads' ||
                  $route.name === 'singleLoad' ||
                  $route.name === 'pendingQuotes' }">
                Shippers
            </router-link>
          </li>
          <li class="nav__item"><a href="https://routemarket.com/carriers" class="nav__link">Carriers</a></li>
          <li class="nav__item"><a href="https://routemarket.com/learn-more" class="nav__link">Learn More</a></li>
          <!-- <li class="nav__item" v-show="!isLoggedIn()">
            <router-link :to="{ name: 'login'}" class="nav__link">Sign Up</router-link>
          </li> -->
          <li class="nav__item" v-show="!isLoggedIn()">
            <router-link :to="{ name: 'login'}" class="nav__link">Login</router-link>
          </li>
          <li class="nav__item" v-show="isLoggedIn()">
            <a @click="handleLogout()" class="nav__link">Logout</a>
          </li>

        </ul>
      </nav>
    </header>
    <div class="container">
      <router-view></router-view>
    </div>
    <footer class="footer">
      <ul class="footer__nav">
        <li class="footer__nav__item"><a href="https://routemarket.com/learn-more" class="footer__nav__link">More Information</a></li>
        <li class="footer__nav__item"><a href="https://play.google.com/store" class="footer__nav__link">Get the App</a></li>
        <li class="footer__nav__item"><a href="https://routemarket.com/jobs" class="footer__nav__link">Contact Us</a></li>
      </ul>
      <p class="footer__copyright">
        Copyright &copy; {{ new Date().getFullYear() }}, RouteMarket Inc. All rights reserved.​​
      </p>
    </footer>
  </div>
</template>

<script>
import auth from './js/auth';

export default {
  methods: {
    handleLogout() {
      auth.logout();
      window.location.href = '/';
    },
    isLoggedIn() {
      return auth.isLoggedIn();
    },
  },
};
</script>

<style lang="scss">
  @import './styles/global';
</style>
