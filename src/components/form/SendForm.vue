<!-- src/components/SendForm.vue -->
<template>
        <div>
            <h4 class="text-muted">
                <font-awesome-icon :icon="arrowRightIcon" />
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
        arrowRightIcon () { return faArrowCircleRight; }
    },
    components: {
        FontAwesomeIcon,
        PostingWifInputComponent
    }
});
</script>

<style>
</style>
