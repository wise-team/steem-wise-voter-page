<!-- src/components/Header.vue -->
<template>
        <div class="text-center header">
            <img class="d-block mx-auto mb-4" src="assets/steem-logo.svg" alt="" width="100" height="100">
            <h1 class="text-muted">steem<wbr /> smart<wbr />votes</h1>
            <p class="lead">A smart tool that allows you to easily vote on behalf of your delegator. Put your posting key,
                type a delegator's username and paste steemit link. Voila! </p>
        </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: [],
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
    },
});
</script>

<style>
</style>
