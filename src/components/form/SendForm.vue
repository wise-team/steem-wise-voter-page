<!-- src/components/SendForm.vue -->
<template>
        <div v-bind:class="[ isEnabled? 'component-enabled' : 'component-disabled text-muted' ]">
            <h4 class="text-muted">
                <span class="icon-span"><font-awesome-icon :icon="arrowRightIcon" /></span>
                &nbsp; Step 4: Authenticate and send
            </h4>
            <div v-if="isLoggedInToSteemConnect">
                <steem-connect-send-form :enabled="isEnabled" />
            </div>
            <div v-else>
                <b-container fluid>
                    <b-row class="align-items-center">
                        <b-col class="steemconnect-login-button-container text-center" cols="12" sm="4" md="4">
                            <steem-connect-login-button />
                            <br />
                            <small class="text-muted" style="width: 67%;">(will redirect you to steemconnect.com and loose your form input data)</small>
                        </b-col>
                        <b-col class="horizontal-or text-center d-block d-sm-none"> ~~~ &nbsp; or &nbsp; ~~~ </b-col>
                        <b-col class="simple-send-form-container" cols="12" sm="8" md="8">
                            <simple-send-form :enabled="isEnabled" />
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import SteemConnectSendForm from "./SteemConnectSendForm.vue";
import SimpleSendForm from "./SimpleSendForm.vue";
import SteemConnectLoginButton from "../SteemConnectLoginButton.vue";
import { mapGetters } from "vuex";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faArrowCircleRight from "@fortawesome/fontawesome-free-solid/faArrowCircleRight";

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
        ...mapGetters({
            isEnabled: "sendFormEnabled",
        }),
        isLoggedInToSteemConnect(): boolean { return this.$store.state.steemConnectData.loggedIn; },
    },
    components: {
        FontAwesomeIcon,
        SteemConnectLoginButton,
        SteemConnectSendForm,
        SimpleSendForm,
    },
});
</script>

<style>
.steemconnect-login-button-container {
    margin-bottom: 1rem;
    margin-top: 1rem;
}

.horizontal-or {
    font-style: italic;
    font-weight: bold;
    color: #bbb;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

@media (min-width: 576px) {
    .simple-send-form-container {
        border-left: 1px solid #aaa;
    }
}
</style>
