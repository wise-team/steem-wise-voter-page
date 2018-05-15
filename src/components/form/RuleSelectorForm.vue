<!-- src/components/RulesSelectorForm.vue -->
<template>
        <div v-bind:class="[ isEnabled? 'component-enabled' : 'component-disabled' ]">
            <h4 class="text-muted">
                <span class="icon-span"><font-awesome-icon :icon="arrowRightIcon" /></span>
                &nbsp; Step 2: Select a ruleset
            </h4>
            <b-container fluid>
                <b-row><b-col class="text-center">
                    <button class="btn btn-primary" :disabled="isButtonDisabled">
                        Load rules for @{{ voterUsername }} from @{{ delegatorUsername }}
                    </button>
                </b-col></b-row>
            </b-container>
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from 'vuex';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faArrowCircleRight from '@fortawesome/fontawesome-free-solid/faArrowCircleRight'

export default Vue.extend({
    props: [],
    data() {
        return {
        }
    },
    methods: {

    },
    computed: {
        arrowRightIcon () { return faArrowCircleRight; },
        ...mapGetters({ 
            isEnabled: 'rulesSelectorFormEnabled'
        }),
        isButtonDisabled (): boolean { return !this.$store.getters.rulesSelectorFormEnabled; }, // disable when loading data from blockchain
        delegatorUsername (): string { return this.$store.state.delegatorUsername; },
        voterUsername (): string { return this.$store.state.voterUsername; }
    },
    components: {
        FontAwesomeIcon
    }
});
</script>

<style>

</style>
