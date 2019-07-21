<template>
    <div>
        <div class="tile" v-for="place in places">
            <div class="thumbnails">
                <img v-for="top in place.topPosts" :src="top.node.thumbnail_src" class="thumbnail"/>
            </div>

            <b-form-checkbox
                    :name="place.title"
                    v-model="place.selected"
            >
                <h4 class="tile-title">
                    {{ place.title }}
                </h4>
            </b-form-checkbox>
        </div>

        <b-button size="lg" class="build-button" @click="buildRoute">
            Build the route  →
        </b-button>
    </div>
</template>

<script>
    import {BButton, BCard, BCardGroup, BCardText, BForm, BFormInput} from 'bootstrap-vue'
    import Measurements from '../services/geoService'

    export default {
        name: 'RouteListPage',
        data() {
            return {
                places: [],
                maxDistance: 20,
                maxPlaces: 9,
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
            this.loadRouteList(this.$route.params.location, this.$route.query);
        },
        methods: {
            buildRoute() {
                const places = this.places
                    .filter(place => place.selected)
                    .map(place => `${place.title}$__$${place.location.lat}$__$${place.location.lng}`);

                if (places.length < 2) {
                    this.$bvToast.toast(`Please select minimum two locations`, {
                        title: 'Error',
                        variant: 'danger',
                        autoHideDelay: 5000
                    })
                } else {
                    this.$router.push({name: 'route', query: { location: places }})
                }
            },
            loadRouteList(name, location) {
                this.$http.get(
                    `https://www.instagram.com/web/search/topsearch/?context=blended&query=${name}&rank_token=0.476645124006966&include_reel=true`
                ).then(response => {
                    const maxDistance = this.maxDistance;
                    const maxPlaces = this.maxPlaces;
                    let placeNumber = 0;

                    response.body.places.map(place => {
                        place = place.place;
                        place.distance = Measurements.distance(place.location, location);

                        return place;
                    }).filter((place) => {
                        return place.distance <= maxDistance;
                    }).sort((a, b) => {
                        return a.distance - b.distance
                    }).forEach(place => {
                        placeNumber++;
                        if (placeNumber > maxPlaces) {
                            return
                        }
                        this.$http.get(`https://www.instagram.com/explore/locations/${place.location.pk}/${place.slug}/limassol/?__a=1`).then(resp => {
                            place.topPosts = resp.body.graphql.location.edge_location_to_top_posts.edges;
                            place.selected = false;

                            this.places.push(place);
                        }, response => {
                            console.error(error);
                        });
                    });
                }, response => {
                    console.error(error);
                });
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

    .tile
        font-family: Roboto;
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        text-align left

    .d-center
        padding 1rem
        margin 0 auto
        width 40rem

    .thumbnails
        display flex
        flex-wrap nowrap
        overflow-x auto

    .thumbnail
        max-height 14rem
        max-width 14rem
        margin-right 0.4rem
        border-radius 0.2rem

    .build-button
        margin-top 1rem
        width 100%
        background #7270FF

</style>
