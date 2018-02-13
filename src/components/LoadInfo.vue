<template>
  <div :class="{'load-info': true, 'load-info--large': isLarge}">
    <p class="load-info__pretitle load-info__pretitle--blue" v-if="status">
      Status: <strong>{{ status }}</strong>
    </p>
    <p class="load-info__pretitle load-info__pretitle--blue" v-if="id">
      Load ID: <strong>{{ id }}</strong>
    </p>
    <h3 class="load-info__title">{{ title }}</h3>
    <div v-if="distance || time || price" class="load-info__details">
      <p v-if="distance" class="load-info__details__item">
        Distance: <span class="no-wrap">{{ distance | miles | numberCommas }} mi</span>
      </p>
      <p v-if="time && time > 0" class="load-info__details__item">
        Age: {{ time | time }}
      </p>
      <p v-if="price" class="load-info__details__item">
        <strong>{{ price | currency }}</strong>
      </p>
    </div>
    <div class="load-info__locations">
      <div class="load-info__locations__item">
        <p class="load-info__locations__title">
          {{ pickupCity }}, {{ pickupState }}
        </p>
        <div v-if="pickupDateStart">
          <p>Pick Up Window</p>
          <p>
            {{ date(pickupDateStart) }}
            <span v-if="!sameDate(pickupDateStart, pickupDateEnd)">
              - {{ date(pickupDateEnd) }}
            </span>
          </p>
          <p>
            {{ datetime(pickupDateStart) }} - {{ datetime(pickupDateEnd) }}
            {{ timeZone(pickupTimeZone) }}
          </p>
        </div>
        <div class="load-info__locations__arrow">
          <svg width="19px" height="14px" viewBox="0 0 19 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">
              <g id="Load-Card" transform="translate(-225.000000, -169.000000)" stroke="currentColor" stroke-width="3">
                <g id="Group-5" transform="translate(26.000000, 13.000000)">
                  <g id="Group-3" transform="translate(0.000000, 111.000000)">
                    <g id="Arrow" transform="translate(200.000000, 47.000000)">
                      <path d="M11.2777778,0.333333333 L15.4536934,5.34443213"></path>
                      <path d="M0.5,5.34443213 L14.4536934,5.34443213"></path>
                      <path d="M16,5 L11,11 L16,5 Z"></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div class="load-info__locations__item">
        <p class="load-info__locations__title">
          {{ dropoffCity }}, {{ dropoffState }}
        </p>
        <div v-if="dropoffDateStart">
          <p>Delivery Window</p>
          <p>
            {{ date(dropoffDateStart) }}
            <span v-if="!sameDate(dropoffDateStart, dropoffDateEnd)">
              - {{ date(dropoffDateEnd) }}
            </span>
          </p>
          <p>
            {{ datetime(dropoffDateStart) }} - {{ datetime(dropoffDateEnd) }}
            {{ timeZone(dropoffTimeZone) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '../js/utilities/utils';

  export default {
    props: [
      'isLarge',
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
      'pickupTimeZone',
      'dropoffCity',
      'dropoffState',
      'dropoffDateStart',
      'dropoffDateEnd',
      'dropoffTimeZone',
    ],
    methods: {
      date(value) {
        return utils.date(value);
      },
      datetime(value) {
        return utils.datetime(value);
      },
      sameDate(date1, date2) {
        return utils.sameDate(date1, date2);
      },
      timeZone(timeZone) {
        if (timeZone) {
          return utils.toTimeZone(timeZone);
        }
        return false;
      },
    },
  };
</script>
