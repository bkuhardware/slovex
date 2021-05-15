import Vue from 'vue'
import store from './store'
import App from "./Counter.vue";

const vm = new Vue({
    el: '#app',
    store,
    render: h => h(App)
});
