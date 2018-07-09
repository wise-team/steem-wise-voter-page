<!-- src/components/send-components/SendingProgress.vue -->
<template>
    <div>
        <p>
            <b-alert variant="info" dismissible :show="loadingMessage.length > 0">{{ loadingMessage }}</b-alert>
            <b-alert variant="danger" dismissible :show="loadingError.length > 0">{{ loadingError }}</b-alert>
            <b-alert variant="success" :show="isVoteorderSent">
                Voteorder was sent successfully! After 1-2 minutes,
                you will be able to see it on 
                <a :href="'https://steemd.com/@' + voterUsername">https://steemd.com/@{{ voterUsername }}</a>
            </b-alert>
        </p>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: [],
    data() {
        return {};
    },
    methods: {
    },
    computed: {
        loadingMessage(): string { return this.$store.state.sendingState.message; },
        loadingError(): string { return this.$store.state.sendingState.error; },
        isVoteorderSent(): boolean { return this.$store.state.sent; },
        loadingInProggress(): boolean { return this.$store.state.sendingState.inProggress; },
        voterUsername(): string { return this.$store.state.voterUsername; },
    },
    components: {
    },
});
</script>

<style>
#postingKeySendModal {
    text-align: left;
}
</style>
