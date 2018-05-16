<!-- src/components/form/inputs/WeightInput.vue -->
<template>
    <b-form-group
        id="weight-group"
        label="Weight of the vote and type (upvote or flag)"
        label-for="weight-input"
        :invalid-feedback="invalidFeedback"
        :valid-feedback="validFeedback"
        :state="state"
    >
        <b-input-group>
            <b-input-group-text slot="prepend">
                <b-form-radio-group id="vote-mode-radio-group" v-model="voteMode" :options="voteModeOptions" name="vote-mode" :disabled="!enabled"></b-form-radio-group>
            </b-input-group-text>
            <input
                type="text" class="form-control"
                id="weight-input"
                :state="state"
                v-model="weight"
                :disabled="!enabled"
            />
            <b-input-group-text slot="append">
                <font-awesome-icon :icon="appendIcon" />
            </b-input-group-text>
        </b-input-group>
    </b-form-group>
</template>

<script lang="ts">
import Vue from "vue";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faWeight from "@fortawesome/fontawesome-free-solid/faWeight";

export default Vue.extend({
    props: ["enabled"],
    data() {
        return {
            voteModeOptions: ["upvote", "flag"],
            valueText: "10000",
        };
    },
    methods: {
    },
    computed: {
        appendIcon(): any { return faWeight; },
        state(): boolean {
            if (this.$store.state.voteData.weight > 0 && this.$store.state.voteData.weight <= 10000) {
                return true;
            } else return false;
        },
        invalidFeedback(): string {
            if (this.valueText.length <= 0) {
                return "Please enter valid weight";
            } else if (isNaN(Number(this.valueText))) {
                return "Weight mut be integer number";
            } else if (parseInt(this.valueText, 10) <= 0 || parseInt(this.valueText, 10) > 10000) {
                return "Weight mut be > 0 and <= 10000";
            } else {
                return "Invalid";
            }
        },
        validFeedback(): string {
            return this.enabled ? "This is correct" : "";
        },
        weight: {
            get(): string {
                if (this.$store.state.voteData.weight > 0) {
                    return this.$store.state.voteData.weight;
                } else return this.valueText;
            },
            set(value: string): void {
                if (!isNaN(Number(value))) {
                    const voteData = {
                        author: this.$store.state.voteData.author,
                        permlink: this.$store.state.voteData.permlink,
                        weight: value,
                        action: this.$store.state.voteData.action,
                    };
                    this.$store.commit("setVoteData", voteData);
                } else {
                    const voteData = {
                        author: this.$store.state.voteData.author,
                        permlink: this.$store.state.voteData.permlink,
                        weight: -1,
                        action: this.$store.state.voteData.action,
                    };
                    this.$store.commit("setVoteData", voteData);
                }
                this.valueText = value;
            },
        },
        voteMode: {
            get(): string {
                return this.$store.state.voteData.action;
            },
            set(value: string): void {
                const voteData = {
                    author: this.$store.state.voteData.author,
                    permlink: this.$store.state.voteData.permlink,
                    weight: this.$store.state.voteData.weight,
                    action: value,
                };
                this.$store.commit("setVoteData", voteData);
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
