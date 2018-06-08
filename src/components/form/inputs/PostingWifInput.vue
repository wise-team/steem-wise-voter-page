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
                v-model="postingWif"
                v-on:keyup="startInput"
                :disabled="!enabled"
            />
        </b-input-group>
    </b-form-group>
</template>

<script lang="ts">
import Vue from "vue";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faShieldAlt from "@fortawesome/fontawesome-free-solid/faShieldAlt";

import { Api } from "../../../api/Api";

export default Vue.extend({
    props: ["enabled"],
    data() {
        return {
            inputStarted: false,
            valueText: "",
        };
    },
    methods: {
        startInput(): void {
            this.inputStarted = true;
        },
    },
    computed: {
        prependIcon(): any { return faShieldAlt; },
        state(): boolean {
            if (!this.inputStarted) return true;
            else {
                return this.valueText.length > 0
                    && Api.isWif(this.valueText);
            }
        },
        invalidFeedback(): string {
            if (this.valueText.length <= 0) {
                return "Please enter valid posting key WIF";
            } else if (!Api.isWif(this.valueText)) {
                return "This is not a key WIF";
            } else return "";
        },
        validFeedback(): string {
            return (this.inputStarted) && this.state === true ? "This is correct" : "";
        },

        postingWif: {
            get(): string {
                if (this.$store.state.postingWif > 0) {
                    return this.$store.state.postingWif;
                } else return this.valueText;
            },
            set(value: string): void {
                if (value.length > 0 && Api.isWif(value)) {
                    this.$store.commit("setPostingWif", value);
                }
                this.valueText = value;
            },
        },
    },
    components: {
        FontAwesomeIcon,
    },
});
</script>

<style>
</style>
