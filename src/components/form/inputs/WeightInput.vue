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
                <div class="level" style="position: relative; width: 100%; height: 2rem;">
                    <input
                        type="range" class="form-control-range"
                        id="weight-input"
                        :state="state"
                        v-model="weight"
                        :disabled="!enabled"
                        :min="sliderRange[0]"
                        :max="sliderRange[1]"
                        step="100"
                        list="tickmarks"
                        :style="'position: absolute; top: 0; height: 100%; '
                            + 'left: ' + ((sliderRange[0] + 10000) / 200) + '%; '
                            + 'width: ' + (((sliderRange[1] + 10000) / 200) - ((sliderRange[0] + 10000) / 200)) + '%;'"
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
import * as _ from "lodash";
import Vue from "vue";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faWeight from "@fortawesome/fontawesome-free-solid/faWeight";

import { Actions } from "../../../store/actions";
import { Rule, Ruleset, WeightRule } from "steem-wise-core";

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
                this.$store.dispatch(Actions.setVoteData, voteData);

                this.valueText = value;
            },
        },
        selectedRuleset(): Ruleset | undefined {
            if (this.$store.state.rules.rulesets
                 && this.$store.state.rules.rulesets.length
                 && this.$store.state.rules.rulesets.length > 0
                 && this.$store.state.selectedRulesetName) {
                     const selectedRuleset: Ruleset [] = this.$store.state.rules.rulesets.filter((ruleset: Ruleset) => ruleset.name  === this.$store.state.selectedRulesetName)
                if (selectedRuleset.length > 0) return selectedRuleset[0];
            }
            return undefined;
        },
        sliderRange(): [number, number] {
            console.log(JSON.stringify(this.selectedRuleset));
            if (this.selectedRuleset && this.selectedRuleset.rules) {
                const weightRuleArr: WeightRule [] = this.selectedRuleset.rules
                    .filter(rule => rule.rule === Rule.Type.Weight).map(rule => rule as WeightRule);
                if (weightRuleArr.length > 0) {
                    return [weightRuleArr[0].min, weightRuleArr[0].max];
                }
            }
            return [-10000, 10000];
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
.range-input-container {
    background: linear-gradient(90deg, rgba(255,255,255,1) 48%, rgba(107,17,255,1) 50%, rgba(255,255,255,1) 52%);
}

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
