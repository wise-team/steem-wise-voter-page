<!-- src/components/SendForm.vue -->
<template>
        <div v-bind:class="[ isEnabled? 'component-enabled' : 'component-disabled text-muted' ]">
            <h4 class="text-muted">
                <span class="icon-span"><font-awesome-icon :icon="arrowRightIcon" /></span>
                &nbsp; Step 4: Paste your posting WIF and send
            </h4>
            <b-form @submit.prevent="onSubmit"><b-container fluid>
                <b-row><b-col>
                    <posting-wif-input-component :enabled="isEnabled" />
                </b-col></b-row>
                <b-row>
                    <b-col cols="12" sm="5" md="4">
                        <button 
                            :class="[!sendButtonEnabled? 'btn btn-lg btn-secondary send-btn' : 'btn btn-lg btn-primary send-btn']"
                            :disabled="!sendButtonEnabled" type="submit"
                        >
                            Send a smart vote! &nbsp;
                            <font-awesome-icon v-if="loadingInProggress" :icon="loadingIcon" spin />
                        </button>
                    </b-col>
                    <b-col cols="12" sm="7" md="8">
                    <p>
                        <b-alert variant="info" dismissible :show="loadingMessage.length > 0">{{ loadingMessage }}</b-alert>
                        <b-alert variant="danger" dismissible :show="loadingError.length > 0">{{ loadingError }}</b-alert>
                        <b-alert variant="success" :show="isVoteorderSent">
                            Voteorder and your vote was sent successfully! After 1-2 minutes,
                            you will be able to see them on 
                            <a :href="'https://steemd.com/@' + voterUsername">https://steemd.com/@{{ voterUsername }}</a>
                        </b-alert>
                    </p>
                    
                    </b-col>
                </b-row>
            </b-container></b-form>
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faArrowCircleRight from "@fortawesome/fontawesome-free-solid/faArrowCircleRight";
import faCog from "@fortawesome/fontawesome-free-solid/faCog";

import PostingWifInputComponent from "./inputs/PostingWifInput.vue";

export default Vue.extend({
    props: [],
    data() {
        return {
        };
    },
    methods: {
        onSubmit() {
            if (this.$store.getters.sendButtonEnabled) {
                this.$store.dispatch("sendSmartvote");
            }
        },
    },
    computed: {
        arrowRightIcon() { return faArrowCircleRight; },
        loadingIcon() { return faCog; },
        ...mapGetters({
            isEnabled: "sendFormEnabled",
            sendButtonEnabled: "sendButtonEnabled",
        }),
        loadingMessage(): string { return this.$store.state.sendingState.message; },
        loadingError(): string { return this.$store.state.sendingState.error; },
        isVoteorderSent(): boolean { return this.$store.state.sent; },
        loadingInProggress(): boolean { return this.$store.state.sendingState.inProggress; },
        voterUsername(): string { return this.$store.state.voterUsername; },
    },
    components: {
        FontAwesomeIcon,
        PostingWifInputComponent,
    },
});
</script>

<style>
</style>
