<!-- src/components/SigningLinks.vue -->
<template>
    <div v-bind:class="[ enabled? 'component-enabled signing-links-panel' : 'component-disabled text-muted signing-links-panel' ]">
        <!--<h6 class="text-muted">
            <span class="icon-span"><font-awesome-icon :icon="arrowRightIcon" /></span>
            &nbsp; 
        </h6>
        <p class="text-small">
            
            Links will be updated after successful validation.
        </p>-->
        <div class="card">
            <div class="card-header">
                (alternative step 4: Send using signing links)
            </div>
            <div class="card-body">
                <p>
                    <ul>
                        <li>
                            <strong>Vessel link:</strong>
                            <a :class="linksClass" :href="vesselUri" rel="nofollow">{{ vesselUri }}</a>
                        </li>
                        <!--<li>
                            <strong>Steemconnect link:</strong>
                            <a :class="linksClass" :href="steemconnectUri" rel="nofollow">{{ steemconnectUri }}</a>
                        </li>-->
                    </ul>
                </p>
                <p><small class="text-muted">
                    Links will be updated after successful validation.
                </small></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faArrowCircleRight from "@fortawesome/fontawesome-free-solid/faArrowCircleRight";
import { Base64 } from "../../util/base64-polyfill.ts";

export default Vue.extend({
    props: [ ],
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
        arrowRightIcon() { return faArrowCircleRight; },
        enabled(): boolean {
            return this.$store.state.validated;
        },
        vesselUri(): string {
            if (this.$store.state.blockchainOps.length > 0) {
                return "steem://sign/tx/"
                    + Base64.encode(JSON.stringify(this.$store.state.blockchainOps))
                    + "#" + Base64.encode(JSON.stringify({}));
            } else {
                return "(validate to see link)";
            }
        },
        steemconnectUri(): string {
            if (this.$store.state.blockchainOps.length > 0) {
                return "https://v2.steemconnect.com/sign/tx/"
                    + Base64.encode(JSON.stringify(this.$store.state.blockchainOps))
                    + "#" + Base64.encode(JSON.stringify({}));
            } else {
                return "(validate to see link)";
            }
        },
        linksClass(): string {
            return this.enabled ? "signing-link" : "signing-link text-muted";
        },
    },
    components: {
        FontAwesomeIcon,
    },
});
</script>

<style>
.signing-links-panel {
    margin-top: 3rem;
}

.signing-link {
    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    hyphens: auto;
    white-space: normal !important;
    font-size: 0.75rem;
    letter-spacing: -0.04em;
    line-height: 0.8;
}
</style>
