<!-- src/components/form/inputs/PostingWifInput.vue -->
<template>
    <b-form-group
        id="posting-wif-group"
        label="Your private posting key"
        label-for="posting-wif"
        :invalid-feedback="invalidFeedback"
        :valid-feedback="validFeedback"
        :state="state"
    >
        <b-input-group>
            <b-input-group-text slot="prepend">
                <font-awesome-icon :icon="prependIcon" />
            </b-input-group-text>
            <input
                type="password" class="form-control"
                id="posting-wif"
                :state="state"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                :disabled="!enabled"
            />
        </b-input-group>
    </b-form-group>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import faShieldAlt from "@fortawesome/fontawesome-free-solid/faShieldAlt";

import { Api } from "../../../api/Api";

export default Vue.extend({
    props: ["enabled", "value"],
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
        prependIcon(): any { return faShieldAlt; },
        state(): boolean {
            // don't display error if input is empty (disabled button is enough information)
            return this.value.length === 0
                || Api.isWif(this.value);
        },
        invalidFeedback(): string {
            return "This is not a key WIF";
        },
        validFeedback(): string {
            return this.state === true && this.value.length > 0 ? "This is correct" : "";
        },
    },
    components: {
        FontAwesomeIcon,
    },
});
</script>

<style>
</style>
