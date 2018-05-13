/**
 * Import Vue & dependencies
 */
import Vue from "vue";
import BootstrapVue from 'bootstrap-vue'


/**
 * Import components
 */
import HelloComponent from "./components/Hello.vue";


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
    <div>
        Name: <input v-model="name" type="text">
        <h1>Hello Component</h1>
        <hello-component :name="name" :initialEnthusiasm="5" />
    </div>
    `,
    data: { name: "World" },
    components: {
        HelloComponent
    }
});
