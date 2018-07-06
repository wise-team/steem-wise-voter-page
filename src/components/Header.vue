<!-- src/components/Header.vue -->
<template>
        <div>
            <div class="text-right">
                <steem-connect-login-button />
            </div>
            <div class="text-center header">
                <img class="d-block mx-auto mb-4" src="assets/wise-logo.png" alt="Wise Vote">
                <p class="lead">A wise tool that allows you to easily vote on behalf of your delegator. Put your posting key,
                    type a delegator's username and paste steemit link. Voila! </p>
            </div>
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import SteemConnectLoginButton from "./SteemConnectLoginButton.vue";

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
    components: {
        SteemConnectLoginButton,
    },
});
</script>

<style>
</style>
