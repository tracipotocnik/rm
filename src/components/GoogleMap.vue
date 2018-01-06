<template>
  <div class="google-map" :id="mapName"></div>
</template>

<style scoped>
  .google-map {
    width: 100%;
    height: 285px;
    margin: 0 auto;
  }
</style>

<script>
export default {
  name: 'google-map',
  props: ['name'],
  data() {
    return {
      mapName: `${this.name}-map`,
      markerCoordinates: [{
        latitude: 51.501527,
        longitude: -0.1921837,
      }, {
        latitude: 51.505874,
        longitude: -0.1838486,
      }, {
        latitude: 51.4998973,
        longitude: -0.202432,
      }],
      map: null,
      bounds: null,
      markers: [],
    };
  },
  mounted() {
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
    const directionsDisplay = new google.maps.DirectionsRenderer({ map: this.map });
    directionsService.route({
      origin: new google.maps.LatLng(
        this.markerCoordinates[0].latitude,
        this.markerCoordinates[0].longitude,
      ),
      destination: new google.maps.LatLng(
        this.markerCoordinates[1].latitude,
        this.markerCoordinates[1].longitude,
      ),
      travelMode: 'DRIVING',
    }, (response, status) => {
      // Route the directions and pass the response to a function to create
      // markers for each step.
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      }
    });
  },
};
</script>
