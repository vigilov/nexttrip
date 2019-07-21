import Vue from 'vue'
import App from './src/App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import Autocomplete from '@trevoreyre/autocomplete-vue'

import router from './src/services/router';

import '@trevoreyre/autocomplete-vue/dist/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(Autocomplete);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
