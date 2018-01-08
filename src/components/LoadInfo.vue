<template>
  <div class="load-info">
    <p class="load-info__pretitle load-info__pretitle--blue" v-show="status">
      Status: <strong>{{ status }}</strong>
    </p>
    <p class="load-info__pretitle load-info__pretitle--blue" v-show="id">
      Load ID: <strong>{{ id }}</strong>
    </p>
    <h3 class="load-info__title">{{ title }}</h3>
    <div class="load-info__details">
      <p class="load-info__details__item">
        Distance: <span class="no-wrap">{{ distance | number }} mi</span>
      </p>
      <p class="load-info__details__item">
        Age: {{ time | time }}
      </p>
      <p class="load-info__details__item">
        <strong>{{ price | currency }}</strong>
      </p>
    </div>
    <div class="load-info__locations">
      <div class="load-info__locations__item">
        <p class="load-info__locations__title">
          {{ pickupCity }}, {{ pickupState }}
        </p>
        <p>Pick Up Window</p>
        <p>{{ pickupDateStart | date }}</p>
        <p>{{ pickupDateStart | datetime }} - {{ pickupDateEnd | datetime }}</p>
      </div>
      <div class="load-info__locations__item">
        <p class="load-info__locations__title">
          {{ dropoffCity }}, {{ dropoffState }}
        </p>
        <p>Delivery Window</p>
        <p>{{ dropoffDateStart | date }}</p>
        <p>{{ dropoffDateStart | datetime }} - {{ dropoffDateEnd | datetime }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
  export default {
    props: [
      'status',
      'id',
      'title',
      'distance',
      'time',
      'price',
      'pickupCity',
      'pickupState',
      'pickupDateStart',
      'pickupDateEnd',
      'dropoffCity',
      'dropoffState',
      'dropoffDateStart',
      'dropoffDateEnd',
    ],
  };
</script>
