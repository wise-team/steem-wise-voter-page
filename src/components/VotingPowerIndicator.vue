<!-- src/components/VotingPowerIndicator.vue -->
<template>
    <span v-if="isLink" class="vp-indicator">
        <a href="#" @click="loadVotingPower">
            <span v-if="errorText.length > 0" class="text-danger">{{ errorText }}</span>
            <span v-else>(load voting power of {{ username }})</span>
            <font-awesome-icon :icon="indicatorIcon" />
        </a>
    </span>
    <span v-else class="vp-indicator">
        {{ loadedText }}
        <font-awesome-icon :icon="indicatorIcon" />
    </span>
</template>

<script lang="ts">
import Vue from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import faIndicator from "@fortawesome/fontawesome-free-solid/faThermometerThreeQuarters";
import { Api } from "../api/Api";

export default Vue.extend({
    props: [ "username" ],
    data() {
        return {
            error: "",
            loadedText: "",
            loadedFor: "",
        };
    },
    methods: {
        loadVotingPower(): boolean {
            const loadingForUser = this.username; // snapshot at loading time

            this.loadedText = "loading voting power...";
            this.error = "";
            this.loadedFor = loadingForUser;

            Api.getVotingPower(loadingForUser)
            .then((vpPercent: number) => {
                this.loadedText = Math.round(vpPercent) + "% of voting power";
                this.error = "";
                this.loadedFor = loadingForUser;
            })
            .catch((error: Error) => {
                this.loadedText = "";
                this.error = error.message;
                this.loadedFor = loadingForUser;
            });
            return false; // to prevent href
        },
    },
    computed: {
        indicatorIcon() { return faIndicator; },
        isLink(): boolean {
            return this.loadedFor !== this.username
                || this.loadedText.length === 0
                || this.error.length > 0;
        },
        errorText(): string {
            if (this.loadedFor === this.username) return this.error;
            else return "";
        },
    },
    components: {
        FontAwesomeIcon,
    },
});
</script>

<style>
</style>
