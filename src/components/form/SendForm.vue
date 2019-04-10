<!-- src/components/SendForm.vue -->
<template>
        <div v-bind:class="[ isEnabled? 'component-enabled' : 'component-disabled text-muted' ]">
            <h4 class="text-muted">
                <span class="icon-span"><font-awesome-icon :icon="arrowRightIcon" /></span>
                &nbsp; Step 4: Choose your authorization method and vote
            </h4>
            <p>&nbsp;</p>

            <p class="sendform-button-container text-center">
                <steem-connect-send-component :enabled="isEnabled" />
            </p>
            <p class="sendform-button-container text-center">
                <vessel-send-component :enabled="isEnabled" />
            </p>
            <p class="sendform-button-container text-center">
                <posting-key-send-component :enabled="isEnabled" />
            </p>

            <p v-if="sendingInProggress" class="sending-cog-container"><font-awesome-icon :icon="sendingIcon" spin /></p>
            <sending-progress-component />
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import faArrowCircleRight from "@fortawesome/fontawesome-free-solid/faArrowCircleRight";
import faCog from "@fortawesome/fontawesome-free-solid/faCog";

import SendingProgressComponent from "./send-components/SendingProgress.vue";
import VesselSendComponent from "./send-components/VesselSend.vue";
import PostingKeySendComponent from "./send-components/PostingKeySend.vue";
import SteemConnectSendComponent from "./send-components/SteemConnectSend.vue";

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
        sendingIcon() { return faCog; },
        ...mapGetters({
            isEnabled: "sendFormEnabled",
        }),
        sendingInProggress(): boolean { return this.$store.state.sendingState.inProggress; },
    },
    components: {
        FontAwesomeIcon,
        VesselSendComponent,
        PostingKeySendComponent,
        SteemConnectSendComponent,
        SendingProgressComponent,
    },
});
</script>

<style>
.sendform-button-container > div > a, .sendform-button-container > div > button {
    width: 50%;
}

@media (max-width: 576px) {
    .sendform-button-container > div > a, .sendform-button-container > div > button {
        width: 85%;
    }
}

.sending-cog-container {
    font-size: 3rem;
    text-align: center;
    color: #aaa;
}
</style>
