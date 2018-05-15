<!-- src/components/RulesSelectorForm.vue -->
<template>
        <div v-bind:class="[ isEnabled? 'component-enabled' : 'component-disabled' ]">
            <h4 class="text-muted">
                <span class="icon-span"><font-awesome-icon :icon="arrowRightIcon" /></span>
                &nbsp; Step 2: Select a ruleset
            </h4>
            <p>Form goes here</p>
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
        })
    },
    components: {
        FontAwesomeIcon
    }
});
</script>

<style>

</style>
