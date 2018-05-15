<!-- src/components/SendForm.vue -->
<template>
        <div v-bind:class="[ isEnabled? 'component-enabled' : 'component-disabled' ]">
            <h4 class="text-muted">
                <span class="icon-span"><font-awesome-icon :icon="arrowRightIcon" /></span>
                &nbsp; Step 4: Paste your posting WIF and send
            </h4>
            <b-form @submit.prevent="onSubmit"><b-container fluid>
                <b-row><b-col>
                    <posting-wif-input-component v-model="postingWif" />
                </b-col></b-row>
                <b-row><b-col>
                    <b-button variant="primary" size="lg" type="submit">Send a smart vote!</b-button>
                </b-col></b-row>
            </b-container></b-form>
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from 'vuex';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faArrowCircleRight from '@fortawesome/fontawesome-free-solid/faArrowCircleRight'

import PostingWifInputComponent from './inputs/PostingWifInput';

export default Vue.extend({
    props: [],
    data() {
        return {
            postingWif: ''
        }
    },
    methods: {

    },
    computed: {
        arrowRightIcon () { return faArrowCircleRight; },
        ...mapGetters({ 
            isEnabled: 'sendFormEnabled'
        })
    },
    components: {
        FontAwesomeIcon,
        PostingWifInputComponent
    }
});
</script>

<style>
</style>
