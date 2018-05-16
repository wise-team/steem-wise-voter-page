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
                        <b-col cols="12" sm="3" md="4">
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
                        <b-col cols="12" sm="9" md="8">
                            <b-list-group>
                                <b-list-group-item variant="primary"><strong>Name:</strong> {{ rulesets[selectedRulesetIndex].name }}  </b-list-group-item>
                                <b-list-group-item><strong>Voter:</strong> {{ rulesets[selectedRulesetIndex].voter }}  </b-list-group-item>
                                <b-list-group-item><strong>Total daily weight:</strong> {{ rulesets[selectedRulesetIndex].total_weight }}  </b-list-group-item>
                                <b-list-group-item><strong>Action:</strong> {{ rulesets[selectedRulesetIndex].action }}  </b-list-group-item>
                                <b-list-group-item 
                                    v-for="(rule, index) in rulesets[selectedRulesetIndex].rules"
                                    :key="index"
                                    :variant="rule | ruleListVariant"
                                >
                                    {{ rule | ruleText }}
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
import { smartvotes_ruleset, smartvotes_rule } from "steem-smartvotes";

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
        rulesets(): smartvotes_ruleset [] { return this.$store.state.rulesets; },
        rulesetOptions(): Array<{ text: string, value: number }> {
            const options = [];
            for (let i = 0; i < this.$store.state.rulesets.length; i++)
                options.push({ text: this.$store.state.rulesets[i].name, value: i });
            return options;
        },
        selectedRulesetIndex: {
            get(): number {
                return this.$store.state.selectedRulesetIndex;
            },
            set(value: number): void {
                this.$store.commit("setSelectedRulesetIndex", value);
            },
        },
    },
    filters: {
        ruleText(rule: smartvotes_rule): string {
            if (rule.type === "tags") {
                if (rule.mode === "allow") {
                    return "Allow only tags: " + rule.tags.join(", ");
                } else if (rule.mode === "deny") {
                    return "Deny tags: " + rule.tags.join(", ");
                } else if (rule.mode === "require") {
                    return "Require all of tags: " + rule.tags.join(", ");
                } else if (rule.mode === "any") {
                    return "Require at least one of tags: " + rule.tags.join(", ");
                } else {
                    return "[Unknown mode " + rule.mode + "] tags: " + rule.tags.join(", ");
                }
            } else if (rule.type === "authors") {
                if (rule.mode === "allow") {
                    return "Allow authors: " + rule.authors.join(", ");
                } else if (rule.mode === "deny") {
                    return "Deny authors: " + rule.authors.join(", ");
                } else {
                    return "[Unknown mode " + rule.mode + "] authors: " + rule.authors.join(", ");
                }
            } else if (rule.type === "custom_rpc") {
                return "Custom RPC: " + rule.rpc_host + ":" + rule.rpc_port
                        + "/" + rule.rpc_path + "@" + rule.rpc_method;
            } else {
                return "Unknown rule: " + JSON.stringify(rule);
            }
        },
        ruleListVariant(rule: smartvotes_rule): string {
            if (rule.type === "tags") {
                return "success";
            } else if (rule.type === "authors") {
                return "warning";
            } else if (rule.type === "custom_rpc") {
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
