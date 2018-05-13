/**
 * Import Vue & dependencies
 */
import Vue from "vue";
import BootstrapVue from 'bootstrap-vue';
/**
 * Import components
 */
import HelloComponent from "./components/Hello.vue";
import HeaderComponent from "./components/Header.vue";
import FormComponent from "./components/Form.vue";
import FooterComponent from "./components/Footer.vue";


/**
 * Import global css
 */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


/**
 * Initialize dependencies
 */
Vue.use(BootstrapVue);


/**
 * Start app
 */
let v = new Vue({
    el: "#app",
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
                <form-component />
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
        FormComponent,
        FooterComponent
    }
});