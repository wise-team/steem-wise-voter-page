<!-- src/components/RulesSelectorForm.vue -->
<template>
        <div v-bind:class="[ isEnabled? 'component-enabled' : 'component-disabled text-muted' ]">
            <h4 class="text-muted">
                <span class="icon-span"><font-awesome-icon :icon="arrowRightIcon" /></span>
                &nbsp; Step 2: Select a ruleset
            </h4>
            <b-container fluid>
                <b-row><b-col><p class="text-center">
                    <button 
                        :class="[isButtonDisabled || rulesets.length > 0? 'btn btn-secondary load-ruleset-btn' : 'btn btn-primary load-ruleset-btn']"
                        :disabled="isButtonDisabled" @click="loadButtonClick"
                    >
                        Load rules from @{{ delegatorUsername }}
                    </button>
                </p></b-col></b-row>
                <b-row><b-col>
                    <p>
                        <b-alert variant="info" dismissible :show="loadingMessage.length > 0">{{ loadingMessage }}</b-alert>
                        <b-alert variant="danger" dismissible :show="loadingError.length > 0">{{ loadingError }}</b-alert>
                    </p>
                    <p v-if="loadingInProggress" class="text-center text-muted loading-icon">
                        <font-awesome-icon :icon="loadingIcon" spin />
                    </p>
                </b-col></b-row>
                <span v-if="rulesets.length > 0">
                    <b-row>
                        <b-col cols="12" sm="12" md="4">
                            <b-card bg-variant="light"
                                header="Select a ruleset"
                            >
                                <p class="card-text">
                                    <b-form-radio-group 
                                        v-model="selectedRulesetIndex"
                                        :options="rulesetOptions"
                                        stacked
                                        name="rulesetSelector"
                                    ></b-form-radio-group>
                                </p>
                            </b-card>
                            <br />
                        </b-col>
                        <b-col cols="12" sm="12" md="8">
                            <b-list-group>
                                <b-list-group-item variant="primary"><strong>Name:</strong> {{ rulesets[selectedRulesetIndex].name }}  </b-list-group-item>
                                <b-list-group-item 
                                    v-for="(rule, index) in rulesets[selectedRulesetIndex].rules"
                                    :key="index"
                                    :variant="rule | ruleListVariant"
                                >
                                    <span v-html="$options.filters.ruleText(rule)"></span>
                                </b-list-group-item>
                            </b-list-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <br />
                            <p class="text-muted text-center">Selected ruleset: &quot;<strong>{{ rulesets[selectedRulesetIndex].name }}</strong>&quot;</p>
                        </b-col>
                    </b-row>
                </span>
            </b-container>
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faArrowCircleRight from "@fortawesome/fontawesome-free-solid/faArrowCircleRight";
import faCog from "@fortawesome/fontawesome-free-solid/faCog";
import { SetRules, Rule, TagsRule, AuthorsRule, CustomRPCRule, WeightRule } from "steem-wise-core";

export default Vue.extend({
    props: [],
    data() {
        return {
        };
    },
    methods: {
        loadButtonClick(): void {
            if (this.$store.getters.rulesSelectorFormEnabled && !this.$store.state.rulesetLoadingState.inProggress) {
                this.$store.dispatch("loadRulesets");
            }
        },
    },
    computed: {
        arrowRightIcon() { return faArrowCircleRight; },
        loadingIcon() { return faCog; },
        ...mapGetters({
            isEnabled: "rulesSelectorFormEnabled",
        }),
        isButtonDisabled(): boolean {
            return ! (
                this.$store.getters.rulesSelectorFormEnabled && !this.$store.state.rulesetLoadingState.inProggress
                );
        },
        delegatorUsername(): string { return this.$store.state.delegatorUsername; },
        voterUsername(): string { return this.$store.state.voterUsername; },
        loadingInProggress(): boolean { return this.$store.state.rulesetLoadingState.inProggress; },
        loadingMessage(): string { return this.$store.state.rulesetLoadingState.message; },
        loadingError(): string { return this.$store.state.rulesetLoadingState.error; },
        rulesets(): { name: string; rules: Rule [] } { return this.$store.state.rules.rulesets; },
        rulesetOptions(): Array<{ text: string, value: number }> {
            const options = [];
            for (let i = 0; i < this.$store.state.rules.rulesets.length; i++)
                options.push({ text: this.$store.state.rules.rulesets[i].name, value: i });
            return options;
        },
        selectedRulesetIndex: {
            get(): number {
                return this.$store.state.selectedRulesetIndex;
            },
            set(value: number): void {
                this.$store.dispatch("setSelectedRulesetIndex", value);
            },
        },
    },
    filters: {
        ruleText(rule: Rule): string {
            if (rule.rule === Rule.Type.Tags) {
                const tagsRule: TagsRule = rule as TagsRule;
                if (tagsRule.mode === TagsRule.Mode.ALLOW) {
                    return "Allow only tags: " + tagsRule.tags.join(", ");
                } else if (tagsRule.mode === TagsRule.Mode.DENY) {
                    return "Deny tags: " + tagsRule.tags.join(", ");
                } else if (tagsRule.mode === TagsRule.Mode.REQUIRE) {
                    return "Require all of tags: " + tagsRule.tags.join(", ");
                } else if (tagsRule.mode === TagsRule.Mode.ANY) {
                    return "Require at least one of tags: " + tagsRule.tags.join(", ");
                } else {
                    return "[Unknown mode " + tagsRule.mode + "] tags: " + tagsRule.tags.join(", ");
                }
            } else if (rule.rule === Rule.Type.Authors) {
                const authorsRule: AuthorsRule = rule as AuthorsRule;
                if (authorsRule.mode === AuthorsRule.Mode.ALLOW) {
                    return "Allow authors: " + authorsRule.authors.join(", ");
                } else if (authorsRule.mode === AuthorsRule.Mode.DENY) {
                    return "Deny authors: " + authorsRule.authors.join(", ");
                } else {
                    return "[Unknown mode " + authorsRule.mode + "] authors: " + authorsRule.authors.join(", ");
                }
            } else if (rule.rule === Rule.Type.Weight) {
                const weightRule: WeightRule = rule as WeightRule;
                return (weightRule.min < 0 ? "Flag: "
                    + Math.abs(Math.min(0, weightRule.max)) / 100 + " - " + Math.abs(weightRule.min) / 100 + " %"
                    : "(no flag)")

                    + "<br />" + // separator

                    (weightRule.max > 0 ? "Upvote: "
                    + Math.max(0, weightRule.min) / 100 + " - " +  weightRule.max / 100 + " %"
                     : "(no upvote)");
            } else if (rule.rule === Rule.Type.CustomRPC) {
                const customRpcRule: CustomRPCRule = rule as CustomRPCRule;
                return "Custom RPC: " + customRpcRule.host + ":" + customRpcRule.port
                        + "/" + customRpcRule.path + "@" + customRpcRule.method;
            } else {
                return "Unknown rule: " + JSON.stringify(rule);
            }
        },
        ruleListVariant(rule: Rule): string {
            if (rule.rule === Rule.Type.Tags) {
                return "success";
            } else if (rule.rule === Rule.Type.Authors) {
                return "success";
            } else if (rule.rule === Rule.Type.Weight) {
                return "primary";
            } else if (rule.rule === Rule.Type.CustomRPC) {
                return "dark";
            } else {
                return "light";
            }
        },
    },
    components: {
        FontAwesomeIcon,
    },
});
</script>

<style>
    .loading-icon {
        font-size: 4rem;
    }
    .load-ruleset-btn {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
