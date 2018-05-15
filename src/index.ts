/**
 * Import Vue & dependencies
 */
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";


/**
 * Import components
 */
import store from "./store/store";
import HelloComponent from "./components/Hello.vue";
import HeaderComponent from "./components/Header.vue";
import FormsComponent from "./components/form/Forms.vue";
import FooterComponent from "./components/Footer.vue";


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
 * Start app
 */
const v = new Vue({
    el: "#app",
    store: store,
    template: `
    <b-container>
        <b-row>
            <b-col>
                <br /><br />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <header-component />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <forms-component />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <footer-component />
            </b-col>
        </b-row>
    </b-container>
    `,
    data: { },
    components: {
        HeaderComponent,
        FormsComponent,
        FooterComponent
    }
});
