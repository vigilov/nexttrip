<template>
    <div class="d-center">
        <h1>Next Trip</h1>

        <autocomplete
                :search="search"
                placeholder="Where you go?"
                aria-label="Where you go?"
                :get-result-value="getResultValue"
                @submit="handleSubmit"
                auto-select
        >
            <template v-slot:result="{ result, props }">
                <li
                        v-bind="props"
                        class="autocomplete-result"
                >
                    <div class="title">
                        {{ result.place.title }}
                    </div>
                    <div class="subtitle">
                        {{ result.place.subtitle }}
                    </div>
                </li>
            </template>
        </autocomplete>
    </div>
</template>

<script>
    import {BButton, BForm, BFormInput} from 'bootstrap-vue'
    import Measurements from '../services/geoService'

    export default {
        name: 'OverviewPage',
        data: () => {
            return {
                maxDistance: 20,
                form: {
                    searchInput: "asdad"
                },
                lastResult: {
                    text: "",
                    value: {}
                },
                places: []
            }
        },
        components: {
            BButton,
            BForm,
            BFormInput
        },
        methods: {
            getResultValue(searchResult) {
                this.lastResult.value = searchResult.place;
                this.lastResult.text = searchResult.place.title;

                return searchResult.place.title;
            },
            search(input) {
                return new Promise(resolve => {
                    if (input.length < 3) {
                        return resolve([])
                    }

                    this.$http.get(
                        `https://www.instagram.com/web/search/topsearch/?context=blended&query=${input}&rank_token=0.476645124006966&include_reel=true`
                    ).then(response => {
                        resolve(response.body.places)
                    }, response => {
                        console.error(error);
                    });
                })
            },
            handleSubmit() {
                const location = this.lastResult.value;

                this.$http.get(
                    `https://www.instagram.com/web/search/topsearch/?context=blended&query=${location.title}&rank_token=0.476645124006966&include_reel=true`
                ).then(response => {
                    const maxDistance = this.maxDistance;

                    response.body.places.map(place => {
                        place = place.place;
                        place.distance = Measurements.distance(place.location, location.location);

                        return place;
                    }).filter((place) => {
                        return place.distance <= maxDistance;
                    }).sort((a,b) => {
                        return a.distance - b.distance
                    }).forEach(place => {



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

    .autocomplete-result
        text-align left

    .subtitle
        color #978f96

    .d-center
        margin 0 auto
        width 400px
</style>
