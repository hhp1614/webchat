// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueSocketio from 'vue-socket.io'

// Vue.use(VueSocketio, 'ws://192.168.0.102:8081')
// Vue.use(VueSocketio, 'ws://192.168.0.102:8088')
Vue.use(VueSocketio, 'http://39.108.190.247:80');

Vue.use(MuseUI);
Vue.prototype.$http = axios;
Vue.prototype.api = 'http://192.168.0.103:8081'
// Vue.prototype.api = 'http://192.168.0.102:8088'
// Vue.prototype.api = 'http://39.108.190.247:80';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
