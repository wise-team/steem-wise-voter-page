<!-- src/components/RulesSelectorForm.vue -->
<template>
        <div>
            <h4 class="text-muted">
                <font-awesome-icon :icon="arrowRightIcon" />
                &nbsp; Step 2: Select a ruleset
            </h4>
            <p>Form goes here</p>
            <br />
            <br />
        </div>
</template>

<script lang="ts">
import Vue from "vue";
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
        arrowRightIcon () { return faArrowCircleRight; }
    },
    components: {
        FontAwesomeIcon
    }
});
</script>

<style>
</style>
