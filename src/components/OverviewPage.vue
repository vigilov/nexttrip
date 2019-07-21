<template>
    <div>
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

        <div class="popular-places">
            <b-card-group columns>
                <b-card
                        title="Latchi, Cyprus"
                        img-src="https://firebasestorage.googleapis.com/v0/b/travel-routes-b8208.appspot.com/o/img1.png?alt=media&token=976216f0-e6e6-4b25-ac33-0d16fe964fb7"
                        img-alt="Image"
                        img-top
                >
                    <b-card-text>
                        Latchi is one of the most famous and beautiful cities in the world.
                        <p/>
                        <b-button variant="outline-secondary"
                                  @click="navigateToRouteList('Latchi Cyprus', {lat: 35.04104322132, lng: 32.394121148978, pk: '223937821'})">
                            Build route
                        </b-button>
                    </b-card-text>
                </b-card>

                <b-card
                        title="Lissbon, Portugal"
                        img-src="https://firebasestorage.googleapis.com/v0/b/travel-routes-b8208.appspot.com/o/img2.png?alt=media&token=4fd14906-b4bc-4865-9ab0-56f77f136e8a"
                        img-alt="Image"
                        img-top
                >
                    <b-card-text>
                        Lissbon is one of the most famous and beautiful cities in the world.
                        <p/>
                        <b-button variant="outline-secondary"
                                  @click="navigateToRouteList('Lissbon, Portugal', {lat: 38.7261, lng: -9.1394, pk: 11100843})">
                            Build route
                        </b-button>
                    </b-card-text>
                </b-card>

                <b-card
                        title="Prague, Czech Republic"
                        img-src="https://firebasestorage.googleapis.com/v0/b/travel-routes-b8208.appspot.com/o/img3.png?alt=media&token=da2b44ff-e540-450f-aaff-636291e6317e"
                        img-alt="Image"
                        img-top
                >
                    <b-card-text>
                        Prague is one of the most famous and beautiful cities in the world.
                        <p/>
                        <b-button variant="outline-secondary"
                                  @click="navigateToRouteList('Prague, Czech Republic', { lat: 50.0876, lng: 14.4215, pk: 207409165 })">
                            Build route
                        </b-button>
                    </b-card-text>
                </b-card>
            </b-card-group>
        </div>
    </div>
</template>

<script>
    import {BButton, BCard, BCardGroup, BCardText, BForm, BFormInput} from 'bootstrap-vue'

    export default {
        name: 'OverviewPage',
        data: () => {
            return {
                form: {
                    searchInput: "asdad"
                },
                lastResult: {
                    text: "",
                    value: {}
                }
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
            navigateToRouteList(name, location) {
                this.$router.push({
                    name: 'route-list',
                    params: {
                        location: name
                    },
                    query: {
                        lat: location.lat,
                        lng: location.lng,
                        pk: location.pk
                    }
                })
            },
            handleSubmit() {
                this.navigateToRouteList(this.lastResult.text, this.lastResult.value.location);
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

    .card-text
        font-family: Roboto;
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 22px;
        color: #888888;
        text-align left

    .card-title
        text-align left

    .autocomplete-result
        text-align left

    .subtitle
        color #978f96

    .popular-places
        margin 2rem 0
</style>
