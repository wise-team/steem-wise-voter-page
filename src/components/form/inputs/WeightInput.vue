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
                <font-awesome-icon :icon="appendIcon" />
            </b-input-group-text>
            <div class="range-input-container form-control">
                <div class="level">
                    <input
                        type="range" class="form-control-range"
                        id="weight-input"
                        :state="state"
                        v-model="weight"
                        :disabled="!enabled"
                        min="-10000"
                        max="10000"
                        step="1"
                        list="tickmarks"
                    />
                    <datalist id="tickmarks">
                        <option value="-10000">-100%</option>
                        <option value="-5000">-50%</option>
                        <option value="0">0%</option>
                        <option value="5000">50%</option>
                        <option value="10000">100%</option>
                    </datalist>
                </div>
                <div class="level label">
                    {{ weight | weightDisplayFilter }}
                </div>
            </div>
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
                const voteData = {
                    author: this.$store.state.voteData.author,
                    permlink: this.$store.state.voteData.permlink,
                    weight: !isNaN(Number(value)) ? value : -1,
                };
                this.$store.commit("setVoteData", voteData);

                this.valueText = value;
            },
        },
    },
    filters: {
        weightDisplayFilter(input: string): string {
            const v = parseInt(input, 10);
            const action = v === 0 ? "remove vote" : ( v > 0 ? "upvote" : "flag" );
            return Math.round(v / 100) + "% (" + action + ")";
        },
    },
    components: {
        FontAwesomeIcon,
    },
});
</script>

<style>
.range-input-container input {
    width: 100%;
    height: 2rem;
}

.range-input-container .level {
    width: 100%;
}

.range-input-container .label {
    text-align: center;
    color: #999;
    font-weight: bold;
}
</style>
