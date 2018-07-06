<!-- src/components/SteemConnectLoginButton.vue -->
<template>
        <div>
            <span class="steemconnect-error-msg">{{ errorMessage }}</span>
            <span v-if="isLoggedIn">
                Logout
            </span>
            <span v-else>
                <b-button class="steemconnect-login-button" size="md" variant="outline-primary" :href="loginUrl">
                    <img src="/assets/steem-logo.svg" alt="Steem logo">  Login with SteemConnect
                </b-button>
            </span>
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
        loginBtnAction() {
            if (this.$root.$data.steemConnectApi.loggedIn) {
                this.$root.$data.steemConnectApi.logout();
            } else {
                this.$root.$data.steemConnectApi.login();
            }
        },
    },
    computed: {
        isLoggedIn(): boolean {
            return this.$root.$data.steemConnectApi.loggedIn;
        },
        loginUrl(): string {
            return this.$root.$data.steemConnectApi.loginUrl;
        },
        errorMessage(): string {
            return this.$root.$data.steemConnectApi.error;
        }
    },
});
</script>

<style>
.steemconnect-login-button img {
    height: 1em;
    margin-bottom: 0.2em;
    margin-right: 1em;
}

.steemconnect-error-msg {
    color: red;
}
</style>
