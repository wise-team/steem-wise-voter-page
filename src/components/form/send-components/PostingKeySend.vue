<!-- src/components/send-components/PostingKeySend.vue -->
<template>
    <div>
        <b-button 
            size="lg"
            :variant="enabled? 'outline-primary' : 'outline-secondary'"
            class="vessel-send-btn"
            :disabled="!enabled" 
            v-b-modal.postingKeySendModal
        >
            <font-awesome-icon :icon="keyIcon" />
            Private posting key
        </b-button>

        <!-- Send modal -->
        <b-modal id="postingKeySendModal" title="Send a WISE voteorder" hide-footer>
            
                <b-container fluid>
                    <b-form @submit.prevent="onSubmit">
                    <b-row>
                        <b-col>
                            <posting-wif-input-component enabled="true" v-model="postingWif" />
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12"><p>
                            <button 
                                :class="[!sendButtonEnabled? 'btn btn-lg btn-secondary send-btn' : 'btn btn-lg btn-primary send-btn']"
                                :disabled="!sendButtonEnabled" type="submit"
                            >
                                Send a wise vote order! &nbsp;
                                <font-awesome-icon v-if="loadingInProggress" :icon="loadingIcon" spin />
                            </button>
                        </p></b-col>
                        <b-col cols="12">
                        <p>
                            <b-alert variant="info" dismissible :show="loadingMessage.length > 0">{{ loadingMessage }}</b-alert>
                            <b-alert variant="danger" dismissible :show="loadingError.length > 0">{{ loadingError }}</b-alert>
                            <b-alert variant="success" :show="isVoteorderSent">
                                Voteorder was sent successfully! After 1-2 minutes,
                                you will be able to see it on 
                                <a :href="'https://steemd.com/@' + voterUsername">https://steemd.com/@{{ voterUsername }}</a>
                            </b-alert>
                        </p>
                        
                        </b-col>
                    </b-row>
                    </b-form>
                </b-container>
            
        </b-modal>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faKey from "@fortawesome/fontawesome-free-solid/faKey";
import faCog from "@fortawesome/fontawesome-free-solid/faCog";

import PostingWifInputComponent from "../inputs/PostingWifInput.vue";

import { Api } from "../../../api/Api";

export default Vue.extend({
    props: [ "enabled" ],
    data() {
        return {
            postingWif: "",
        };
    },
    methods: {
        onSubmit() {
            if (this.$store.getters.sendButtonEnabled) {
                this.$store.dispatch("sendWISEVoteUsingPostingKey", { postingWif: this.postingWif });
            }
        },
    },
    computed: {
        keyIcon() { return faKey; },
        loadingIcon() { return faCog; },
        sendButtonEnabled(): boolean {
            return this.$store.getters.sendButtonEnabled
                && this.postingWif.length > 0
                && Api.isWif(this.postingWif);
        },
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
#postingKeySendModal {
    text-align: left;
}
</style>
