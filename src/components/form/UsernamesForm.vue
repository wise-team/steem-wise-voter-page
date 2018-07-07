<!-- src/components/UsernamesForm.vue -->
<template>
        <div class="component-enabled">
            <h4 class="text-muted">
                <span class="icon-span"><font-awesome-icon :icon="arrowRightIcon" /></span>
                &nbsp; Step 1: Type your &amp; delegator username
            </h4>
            <b-form @submit.prevent="onSubmit">
                <b-container fluid>
                    <b-row><b-col cols="12" sm="6">
                        <steem-username-input-component label="Your (voter) username" id="voter-username" :icon="voterIcon" v-model="voterUsername" />
                    </b-col>
                    <b-col cols="12" sm="6">
                        <steem-username-input-component label="Delegator username" id="delegator-username" :icon="delegatorIcon" v-model="delegatorUsername" />
                        <b-button size="sm" variant="primary" @click="getVotingPower" class="mb-3">Get Voting Power</b-button>
                        <b-alert variant="info" :show="delegatorVotingPowerLoading">Loading...</b-alert>
                        <b-progress variant="info" :striped="true" v-show="delegatorVotingPowerLoaded && !(delegatorVotingPowerError.length > 0)">
                            <b-progress-bar :value="delegatorVotingPower" :label="delegatorVotingPower.toFixed(2)+'%'"></b-progress-bar>
                        </b-progress>
                        <b-alert variant="danger" :show="delegatorVotingPowerError.length > 0">{{ delegatorVotingPowerError }}</b-alert>
                    </b-col></b-row>
                </b-container>
            </b-form>
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faArrowCircleRight from "@fortawesome/fontawesome-free-solid/faArrowCircleRight";
import faUser from "@fortawesome/fontawesome-free-solid/faUser";
import faUserTie from "@fortawesome/fontawesome-free-solid/faUserTie";

import SteemUsernameInputComponent from "./inputs/SteemUsernameInput.vue";

export default Vue.extend({
    props: [],
    data() {
        return {
        };
    },
    methods: {
        getVotingPower() {
            this.$store.dispatch('getDelegatorVotingPower');
        }
    },
    computed: {
        arrowRightIcon() { return faArrowCircleRight; },
        voterIcon() {return faUser; },
        delegatorIcon() { return faUserTie; },
        voterUsername: {
            get(): string {
                return this.$store.state.voterUsername;
            },
            set(value: string): void {
                this.$store.dispatch("setVoterUsername", value);
            },
        },
        delegatorUsername: {
            get(): string {
                return this.$store.state.delegatorUsername;
            },
            set(value: string): void {
                this.$store.dispatch("setDelegatorUsername", value);
            },
        },
        delegatorVotingPower() {
            return this.$store.state.delegatorVotingPower;
        },
        delegatorVotingPowerLoading() {
            return this.$store.state.delegatorVotingPowerLoadingState.inProggress;
        },
        delegatorVotingPowerLoaded() {
            return this.$store.state.delegatorVotingPowerLoadingState.loaded;
        },
        delegatorVotingPowerError() {
            return this.$store.state.delegatorVotingPowerLoadingState.error;
        }
    },
    components: {
        FontAwesomeIcon,
        SteemUsernameInputComponent,
    },
});
</script>

<style>
</style>
