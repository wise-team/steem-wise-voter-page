<!-- src/components/send-components/PostingKeySend.vue -->
<template>
    <div>
        <b-button 
            size="lg"
            :variant="enabled? 'outline-primary' : 'outline-secondary'"
            class="postingkey-send-btn"
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
                        <b-col>
                            <p>
                                <button 
                                    :class="[!sendButtonEnabled? 'btn btn-lg btn-secondary send-btn' : 'btn btn-lg btn-primary send-btn']"
                                    :disabled="!sendButtonEnabled" type="submit"
                                >
                                    Send a wise vote order! &nbsp;
                                    <font-awesome-icon v-if="loadingInProggress" :icon="loadingIcon" spin />
                                </button>
                            </p>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <sending-progress-component />
                        </b-col>
                    </b-row>
                    </b-form>
                </b-container>
            
        </b-modal>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import faKey from "@fortawesome/fontawesome-free-solid/faKey";
import faCog from "@fortawesome/fontawesome-free-solid/faCog";

import PostingWifInputComponent from "../inputs/PostingWifInput.vue";
import SendingProgressComponent from "./SendingProgress.vue";

import { Api } from "../../../api/Api";
import { Actions } from "../../../store/actions";

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
                this.$store.dispatch(Actions.sendWISEVoteUsingPostingKey, { postingWif: this.postingWif });
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
        loadingInProggress(): boolean { return this.$store.state.sendingState.inProggress; },
    },
    components: {
        FontAwesomeIcon,
        PostingWifInputComponent,
        SendingProgressComponent,
    },
});
</script>

<style>
#postingKeySendModal {
    text-align: left;
}
</style>
