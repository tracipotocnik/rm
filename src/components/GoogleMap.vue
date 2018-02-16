<template>
  <div :class="{'google-map': true, 'google-map--tall': isTall}" :id="mapName"></div>
</template>

<style lang="scss" scoped>
  .google-map {
    width: 100%;
    height: 285px;
    margin: auto auto 0;

    &--tall {
      height: 300px;
    }
  }
</style>

<script>
export default {
  props: [
    'name',
    'isTall',
    'startLatitude',
    'startLongitude',
    'midLatitude',
    'midLongitude',
    'endLatitude',
    'endLongitude',
  ],
  data() {
    return {
      mapName: `${this.name}-map`,
      markerCoordinates: [{
        latitude: this.startLatitude,
        longitude: this.startLongitude,
      }, {
        latitude: this.midLatitude,
        longitude: this.midLongitude,
      }, {
        latitude: this.endLatitude,
        longitude: this.endLongitude,
      }],
      map: null,
      bounds: null,
      markers: [],
      hasWaypoint: false,
    };
  },
  watch: {
    startLatitude: {
      handler(val) {
        this.markerCoordinates[0].latitude = val;
        this.generateMap();
      },
      deep: true,
    },
    startLongitude: {
      handler(val) {
        this.markerCoordinates[0].longitude = val;
        this.generateMap();
      },
      deep: true,
    },
    midLatitude: {
      handler(val) {
        this.markerCoordinates[1].latitude = val;
        this.generateMap();
      },
      deep: true,
    },
    midLongitude: {
      handler(val) {
        this.markerCoordinates[1].longitude = val;
        this.generateMap();
      },
      deep: true,
    },
    endLatitude: {
      handler(val) {
        this.markerCoordinates[2].latitude = val;
        this.generateMap();
      },
      deep: true,
    },
    endLongitude: {
      handler(val) {
        this.markerCoordinates[2].longitude = val;
        this.generateMap();
      },
      deep: true,
    },
  },
  mounted() {
    if (this.markerCoordinates[1].latitude && this.markerCoordinates[1].longitude) {
      this.hasWaypoint = true;
    }

    this.generateMap();
  },
  methods: {
    generateMap() {
      this.bounds = new google.maps.LatLngBounds();
      const element = document.getElementById(this.mapName);
      // Instantiate a directions service.
      const directionsService = new google.maps.DirectionsService; // eslint-disable-line new-parens
      const mapCentre = this.markerCoordinates[0];
      const options = {
        center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude),
      };
      this.map = new google.maps.Map(element, options);
      // Create a renderer for directions and bind it to the map.
      const directionsDisplay = new google.maps.DirectionsRenderer({
        map: this.map,
        suppressMarkers: true,
      });
      const routeData = {
        origin: new google.maps.LatLng(
          this.markerCoordinates[0].latitude,
          this.markerCoordinates[0].longitude,
        ),
        destination: new google.maps.LatLng(
          this.markerCoordinates[2].latitude,
          this.markerCoordinates[2].longitude,
        ),
        travelMode: 'DRIVING',
      };
      if (this.hasWaypoint) {
        routeData.waypoints = [{
          location: new google.maps.LatLng(
            this.markerCoordinates[1].latitude,
            this.markerCoordinates[1].longitude,
          ),
        }];

        this.addCurrentPositionMarker(
          this.markerCoordinates[1].latitude,
          this.markerCoordinates[1].longitude,
          this.map,
        );
      }
      directionsService.route(routeData, (response, status) => {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        }
      });

      // Add origin marker
      this.addMarker(
        this.markerCoordinates[0].latitude,
        this.markerCoordinates[0].longitude,
        'A',
        this.map,
      );

      // Add destination marker
      this.addMarker(
        this.markerCoordinates[2].latitude,
        this.markerCoordinates[2].longitude,
        'B',
        this.map,
      );
    },
    addMarker(latitude, longitude, markerLabel, mapObj) {
      return new google.maps.Marker({
        position: {
          lat: latitude,
          lng: longitude,
        },
        label: markerLabel,
        map: mapObj,
      });
    },
    addCurrentPositionMarker(latitude, longitude, mapObj) {
      return new google.maps.Marker({
        position: {
          lat: latitude,
          lng: longitude,
        },
        map: mapObj,
        title: 'Current Location',
      });
    },
  },
};
</script>
