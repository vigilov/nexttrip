<template>
    <div>
        <div class="map" id="map" ref="map">

        </div>
    </div>
</template>

<script>
    import {BButton, BCard, BCardGroup, BCardText, BForm, BFormInput} from 'bootstrap-vue'
    import Measurements from '../services/geoService'

    export default {
        name: 'RoutePage',
        data: () => {
            return {
                map: null
            }
        },
        components: {
            BButton,
            BForm,
            BFormInput,
            BCard,
            BCardGroup,
            BCardText
        },
        mounted() {
            const locations = this.$route.query.location.map(place => {
                const params = place.split("$__$");
                return {
                    title: params[0],
                    lat: params[1],
                    lng: params[2],
                }
            });

            this.calculateAndRenderDirections(this.buildRoute(locations));
        },

        methods: {
            buildRoute(locations) {
                const usedLocations = {};
                usedLocations[locations[0].title] = locations[0];
                let lastLocation = locations[0];

                for (;;) {
                    if (Object.keys(usedLocations).length === locations.length) {
                        break
                    }

                    let winner = null;
                    let nearestLocation = null;
                    for (let i = 1; i < locations.length; i ++) {
                        if (usedLocations[locations[i].title] != null) {
                            continue
                        }
                        if (usedLocations.length === locations.length - 1) {
                            usedLocations[locations[i].title] = true;
                            break
                        }
                        if (nearestLocation === null) {
                            nearestLocation = locations[i];
                            continue
                        }

                        const lastNearestDistance = Measurements.distance(nearestLocation, lastLocation);
                        const currentDistance = Measurements.distance(locations[i], lastLocation);
                        if (currentDistance < lastNearestDistance) {
                            usedLocations[locations[i].title] = locations[i];
                            lastLocation = locations[i];
                            winner = locations[i];

                            break;
                        }
                    }

                    if (winner === null && nearestLocation !== null) {
                        usedLocations[nearestLocation.title] = nearestLocation;
                        lastLocation = nearestLocation;
                    }
                }

                return Object.values(usedLocations);
            },
            calculateDirection(directionsService, from, to) {
                const request = {
                    origin: new google.maps.LatLng(from.lat, from.lng),
                    destination : new google.maps.LatLng(to.lat, to.lng),
                    travelMode: 'WALKING'
                };

                directionsService.route(request, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        const directionsDisplay = new google.maps.DirectionsRenderer();

                        directionsDisplay.setMap(this.map);
                        directionsDisplay.setDirections(result);
                    }
                });
            },
            calculateAndRenderDirections(locations) {
                this.map = new google.maps.Map(
                    document.getElementById('map'), {zoom: 4, center: {lat: -25.344, lng: 131.036}});

                const directionsService = new google.maps.DirectionsService();

                for (let i = 1; i < locations.length; i ++) {
                    const from = locations[i - 1];
                    const to = locations[i];

                    this.calculateDirection(directionsService, from, to);
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
    h3
        margin 40px 0 0

    h4
        font-size 1.2rem

    .map
        width 100%
        height 20rem

</style>
