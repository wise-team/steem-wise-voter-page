<!-- src/components/send-components/SteemConnectSend.vue -->
<template>
    <div>
        <b-button 
            v-if="isLoggedInToSteemConnect"
            size="lg"
            :variant="enabled? 'outline-primary' : 'outline-secondary'"
            class="steemconnect-send-btn"
            :disabled="!sendButtonEnabled"
            @click="sendVoteorder"
        >
            <img src="/assets/steemconnect-icon.svg" alt="Steemconnect icon" />
            SteemConnect
        </b-button>

        <b-button 
            v-else
            size="lg"
            :variant="enabled? 'outline-primary' : 'outline-secondary'"
            class="steemconnect-send-btn"
            :disabled="!sendButtonEnabled" 
            @click="loginWithAutomaticSend"
        >
            <img src="/assets/steemconnect-icon.svg" alt="Steemconnect icon" />
            SteemConnect (Login &amp; send)
        </b-button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Actions } from "../../../store/actions";
import { SteemConnectApiHelper } from "../../../api/SteemConnectApiHelper";

export default Vue.extend({
    props: [ "enabled" ],
    data() {
        return {
        };
    },
    methods: {
        sendVoteorder(): void {
            this.$store.dispatch(Actions.sendWISEVoteUsingSteemconnect);
        },
        loginWithAutomaticSend(): void {
            this.$store.dispatch(Actions.immediatelySendAfterSteemConnectLogin);
            setTimeout(() => {
                window.location.href = SteemConnectApiHelper.getLoginUrl();
            }, 100);
        },
    },
    computed: {
        isLoggedInToSteemConnect(): boolean { return this.$store.state.steemConnectData.loggedIn; },
        sendButtonEnabled(): boolean {
            return this.enabled && this.$store.getters.sendButtonEnabled;
        },
        loadingInProggress(): boolean { return this.$store.state.sendingState.inProggress; },
    },
    components: {
    },
});
</script>

<style>
.steemconnect-send-btn img {
    height: 1.5rem;
}
</style>
