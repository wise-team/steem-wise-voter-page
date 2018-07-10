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
                        <div v-if="isLoggedInToSteemConnect">
                            <steemconnect-voter-input-component v-model="voterUsername" />
                        </div>
                        <div v-else>
                            <steem-username-input-component label="Your (voter) username" id="voter-username" :icon="voterIcon" v-model="voterUsername" />
                        </div>
                        <small class="steemconnect-link">
                            <steem-connect-login-button />
                        </small>
                    </b-col>
                    <b-col cols="12" sm="6">
                        <steem-username-input-component label="Delegator username" id="delegator-username" :icon="delegatorIcon" v-model="delegatorUsername" />
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

import SteemConnectLoginButton from "../SteemConnectLoginButton.vue";
import SteemUsernameInputComponent from "./inputs/SteemUsernameInput.vue";
import SteemconnectVoterInputComponent from "./inputs/SteemconnectVoterInput.vue";
import { Actions } from "../../store/actions";

export default Vue.extend({
    props: [],
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
        arrowRightIcon() { return faArrowCircleRight; },
        voterIcon() {return faUser; },
        delegatorIcon() { return faUserTie; },
        isLoggedInToSteemConnect(): boolean { return this.$store.state.steemConnectData.loggedIn; },
        voterUsername: {
            get(): string {
                return this.$store.state.voterUsername;
            },
            set(value: string): void {
                this.$store.dispatch(Actions.setVoterUsername, value);
            },
        },
        delegatorUsername: {
            get(): string {
                return this.$store.state.delegatorUsername;
            },
            set(value: string): void {
                this.$store.dispatch(Actions.setDelegatorUsername, value);
            },
        },
    },
    components: {
        FontAwesomeIcon,
        SteemUsernameInputComponent,
        SteemconnectVoterInputComponent,
        SteemConnectLoginButton,
    },
});
</script>

<style>
.steemconnect-link {
    top: -1rem;
    position: relative;
    width: 100%;
    text-align: right;
    display: block;
    font-size: 0.6rem;
    height: 1rem;
}

.steemconnect-link a {
    font-size: 0.8rem;
    text-align: right;
}
</style>
