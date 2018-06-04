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
            valueText: "10000",
        };
    },
    methods: {
    },
    computed: {
        appendIcon(): any { return faWeight; },
        state(): boolean {
            if (this.$store.state.voteData.weight >= -10000 && this.$store.state.voteData.weight <= 10000) {
                return true;
            } else return false;
        },
        invalidFeedback(): string {
            if (this.valueText.length <= 0) {
                return "Please enter valid weight";
            } else if (isNaN(Number(this.valueText))) {
                return "Weight mut be integer number";
            } else if (parseInt(this.valueText, 10) < -10000 || parseInt(this.valueText, 10) > 10000) {
                return "Weight mut be >= -10000 and <= 10000";
            } else {
                return "";
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
                    };
                    this.$store.commit("setVoteData", voteData);
                } else {
                    const voteData = {
                        author: this.$store.state.voteData.author,
                        permlink: this.$store.state.voteData.permlink,
                        weight: -1,
                    };
                    this.$store.commit("setVoteData", voteData);
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
