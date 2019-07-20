<template>
    <div class="hello">
        <h1>Next Trip</h1>

        <b-button @click="search()">Button</b-button>
    </div>
</template>

<script>
    import { BButton } from 'bootstrap-vue'

    export default {
        name: 'OverviewPage',
        components: {
            BButton
        },
        methods: {
            search() {
                this.$http.get('https://www.instagram.com/web/search/topsearch/?context=blended&query=limassol&rank_token=0.476645124006966&include_reel=true').then(response => {

                    // get body data
                    this.someData = response.body;

                    console.log('resp', someData)
                }, response => {
                    alert(error);
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
