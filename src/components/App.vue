<!-- src/components/App.vue -->
<template>
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
</template>

<script lang="ts">
import Vue from "vue";

import HeaderComponent from "./Header.vue";
import FormsComponent from "./form/Forms.vue";
import FooterComponent from "./Footer.vue";

export default Vue.extend({
    props: [],
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
    components: {
        HeaderComponent,
        FormsComponent,
        FooterComponent
    }
});
</script>

<style>
</style>
