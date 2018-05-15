<!-- src/components/RulesSelectorForm.vue -->
<template>
        <div v-bind:class="[ isEnabled? 'component-enabled' : 'component-disabled' ]">
            <h4 class="text-muted">
                <span class="icon-span"><font-awesome-icon :icon="arrowRightIcon" /></span>
                &nbsp; Step 2: Select a ruleset
            </h4>
            <b-container fluid>
                <b-row><b-col><p class="text-center">
                    <button :class="[isButtonDisabled? 'btn btn-lg btn-secondary' : 'btn btn-lg btn-primary']" :disabled="isButtonDisabled" @click="loadButtonClick">
                        Load rules for @{{ voterUsername }} from @{{ delegatorUsername }}
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
            </b-container>
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from 'vuex';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faArrowCircleRight from '@fortawesome/fontawesome-free-solid/faArrowCircleRight'
import faCog from '@fortawesome/fontawesome-free-solid/faCog'

export default Vue.extend({
    props: [],
    data() {
        return {
        }
    },
    methods: {
        loadButtonClick(): void {
            if(this.$store.getters.rulesSelectorFormEnabled && !this.$store.state.rulesetLoadingState.inProggress) {
                this.$store.dispatch('loadRulesets');
            }
        }
    },
    computed: {
        arrowRightIcon () { return faArrowCircleRight; },
        loadingIcon () { return faCog; },
        ...mapGetters({ 
            isEnabled: 'rulesSelectorFormEnabled'
        }),
        isButtonDisabled (): boolean { 
            return ! (this.$store.getters.rulesSelectorFormEnabled && !this.$store.state.rulesetLoadingState.inProggress); 
        },
        delegatorUsername (): string { return this.$store.state.delegatorUsername; },
        voterUsername (): string { return this.$store.state.voterUsername; },
        loadingInProggress(): boolean { return this.$store.state.rulesetLoadingState.inProggress },
        loadingMessage(): string { return this.$store.state.rulesetLoadingState.message },
        loadingError(): string { return this.$store.state.rulesetLoadingState.error }
    },
    components: {
        FontAwesomeIcon
    }
});
</script>

<style>
    .loading-icon {
        font-size: 4rem;
    }
</style>
