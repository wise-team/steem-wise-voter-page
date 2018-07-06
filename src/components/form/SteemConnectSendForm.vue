<!-- src/components/SteemConnectSendForm.vue -->
<template>
        <div v-bind:class="[ enabled? 'component-enabled' : 'component-disabled text-muted' ]">
            <b-form @submit.prevent="onSubmit"><b-container fluid>
                <b-row>
                    <b-col cols="12"><p class="text-center">
                        <br />
                        <button 
                            :class="[!sendButtonEnabled? 'btn btn-lg btn-secondary send-btn' : 'btn btn-lg btn-primary send-btn']"
                            :disabled="!sendButtonEnabled" type="submit"
                        >
                            &nbsp; Send a WISE vote order &nbsp;
                            <font-awesome-icon v-if="loadingInProggress" :icon="loadingIcon" spin />
                        </button>
                        <br />
                        <small class="text-muted">Authenticatation &amp; safety by<br /> <a href="https://steemconnect.com/">SteemConnect</a></small>
                    </p></b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                    <p>
                        <b-alert variant="info" dismissible :show="loadingMessage.length > 0">{{ loadingMessage }}</b-alert>
                        <b-alert variant="danger" dismissible :show="loadingError.length > 0">{{ loadingError }}</b-alert>
                        <b-alert variant="success" :show="isVoteorderSent">
                            Voteorder was sent successfully! After 1-2 minutes,
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
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faCog from "@fortawesome/fontawesome-free-solid/faCog";


export default Vue.extend({
    props: [ "enabled" ],
    data() {
        return {
        };
    },
    methods: {
        onSubmit() {
            if (this.$store.getters.sendButtonEnabled) {
                this.$store.dispatch("sendWISEVoteUsingSteemconnect");
            }
        },
    },
    computed: {
        loadingIcon() { return faCog; },
        loadingMessage(): string { return this.$store.state.sendingState.message; },
        loadingError(): string { return this.$store.state.sendingState.error; },
        isVoteorderSent(): boolean { return this.$store.state.sent; },
        loadingInProggress(): boolean { return this.$store.state.sendingState.inProggress; },
        voterUsername(): string { return this.$store.state.voterUsername; },
        sendButtonEnabled(): boolean {
            return this.enabled && !this.loadingInProggress;
        },
    },
    components: {
        FontAwesomeIcon,
    },
});
</script>

<style>
</style>
