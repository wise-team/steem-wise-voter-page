/**
 * Import Vue & dependencies
 */
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";


/**
 * Import components
 */
import store from "./store/store";
import App from "./components/App.vue";

/**
 * Import global css
 */
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./style.css";


/**
 * Initialize dependencies
 */
Vue.use(BootstrapVue);


/**
 * Initialize SteemConnect
 */
import { SteemConnectApi } from "./api/SteemConnectApi";
const scApi = new SteemConnectApi();
scApi.initialize();


/**
 * Start app
 */
const v = new Vue({
    el: "#app",
    data: {
        steemConnectApi: scApi,
    },
    store: store,
    render: h => h(App),
});
