<!-- src/components/SteemConnectLoginButton.vue -->
<template>
        <div class="steemconnect-container">
            <span class="steemconnect-error-msg">{{ errorMessage }}</span>
            <span v-if="isLoggedIn">
                <span class="steemconnect-account-details">Hello, {{ username }}! &nbsp;&nbsp;&nbsp;&nbsp; </span>

                <b-button class="steemconnect-logout-button" size="sm" variant="outline-secondary"
                     @click="logout" title="Logout from SteemConnect">
                    <img class="steemconnect-icon" src="/assets/steemconnect-icon.svg" alt="Steem logo"> Logout
                </b-button>
            </span>
            <span v-else>
                <b-button class="steemconnect-login-button" variant="outline-primary" :href="loginUrl">
                    <img class="steemconnect-icon" src="/assets/steemconnect-icon.svg" alt="Steem logo"> Login with SteemConnect
                </b-button>
            </span>
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import { SteemConnectApiHelper } from "../api/SteemConnectApiHelper";

export default Vue.extend({
    props: [],
    data() {
        return {
        };
    },
    methods: {
        logout() {
            this.$store.dispatch("logoutFromSteemConnect");
        },
    },
    computed: {
        isLoggedIn(): boolean {
            return this.$store.state.steemConnectData.loggedIn;
        },
        loginUrl(): string {
            return SteemConnectApiHelper.getLoginUrl();
        },
        errorMessage(): string {
            return this.$store.state.steemConnectData.error;
        },
        username(): string {
            return this.$store.state.steemConnectData.account ?
                this.$store.state.steemConnectData.account.name : "(loading account...)";
        },
    },
});
</script>

<style>
.steemconnect-container {
    color: #999;
}

.steemconnect-login-button {
    white-space: normal !important;
    word-wrap: break-word;
}

.steemconnect-icon {
    height: 1em;
    margin-bottom: 0.2em;
}

.steemconnect-error-msg {
    color: red;
}
</style>
