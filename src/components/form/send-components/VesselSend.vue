<!-- src/components/send-components/VesselSend.vue -->
<template>
    <div>
        <b-button 
            size="lg"
            :variant="enabled? 'outline-primary' : 'outline-secondary'"
            class="vessel-send-btn"
            :disabled="!enabled" 
            :href="vesselUri" 
            rel="nofollow"
        >
            <img src="assets/vessel-64.png" alt="Vessel logo" />
            Vessel
        </b-button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Base64 } from "../../../util/base64-polyfill";

export default Vue.extend({
    props: [ "enabled" ],
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
        vesselUri(): string {
            if (this.$store.state.blockchainOps.length > 0) {
                return "steem://sign/tx/"
                    + Base64.encode(JSON.stringify(this.$store.state.blockchainOps))
                    + "#" + Base64.encode(JSON.stringify({}));
            } else {
                return "(validate to see link)";
            }
        },
        /*steemconnectUri(): string {
            if (this.$store.state.blockchainOps.length > 0) {
                return "https://v2.steemconnect.com/sign/tx/"
                    + Base64.encode(JSON.stringify(this.$store.state.blockchainOps))
                    + "#" + Base64.encode(JSON.stringify({}));
            } else {
                return "(validate to see link)";
            }
        },*/
    },
    components: {
    },
});
</script>

<style>
.vessel-send-btn img {
    height: 1.5rem;
}
</style>
