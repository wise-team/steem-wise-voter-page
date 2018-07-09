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
            
        >
            <img src="/assets/steemconnect-icon.svg" alt="Steemconnect icon" />
            SteemConnect (Login &amp; send)
        </b-button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: [ "enabled" ],
    data() {
        return {
        };
    },
    methods: {
        sendVoteorder(): void {
            this.$store.dispatch("sendWISEVoteUsingSteemconnect");
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
