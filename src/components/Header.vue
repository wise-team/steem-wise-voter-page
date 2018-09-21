<!-- src/components/Header.vue -->
<template>
        <div>
            <div class="text-center header">
                <a href="/"><img class="d-block mx-auto mb-4" src="assets/wise-logo.png" alt="Wise Vote"></a>
                <p class="lead">
                    A wise tool that allows you to easily vote on behalf of your delegator.
                    Type a delegator's username, paste link to steem post and vote. Voila!
                </p>
            </div>
            <p class="text-right">
                <b-button size="sm" variant="link" @click="resetForm">
                    Reset form
                </b-button>
            </p>
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Actions } from "../store/actions";

export default Vue.extend({
    props: [],
    data() {
        return {
        };
    },
    methods: {
        resetForm() {
            this.$store.dispatch(Actions.resetFormData);
        },
    },
    computed: {
    },
    components: {
    },
});
</script>

<style>
</style>
