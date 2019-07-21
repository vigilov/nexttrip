<template>
    <div id="app">
        <div class="d-center">

            <h1>Next Trip</h1>

            <router-view/>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'app',
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

        background: #F1F5FF;
    }

    .d-center {
        padding: 1rem;
        margin: 0 auto;
        width: 40rem;

    }

    input.autocomplete-input {
        border: 1px solid #7B78FF;
        box-sizing: border-box;
        border-radius: 3px;
        background-color: white;
    }

    @media screen and (min-device-width: 600px) {
        #app {
            margin-top: 60px;
        }
    }
</style>
