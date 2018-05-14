<!-- src/components/UsernamesForm.vue -->
<template>
        <div>
            <h4 class="text-muted">
                <font-awesome-icon :icon="arrowRightIcon" />
                &nbsp; Step 1: Type your &amp; your delegator username
            </h4>
            <b-form @submit.prevent="onSubmit">
                <b-container fluid>
                    <b-row><b-col cols="12" sm="6">
                        <steem-username-input-component label="Your (voter) username" :icon="voterIcon" v-model="voterUsername" />
                    </b-col>
                    <b-col cols="12" sm="6">
                        <steem-username-input-component label="Delegator username" :icon="delegatorIcon" v-model="delegatorUsername" />
                    </b-col></b-row>
                </b-container>
            </b-form>
            <br />
            <br />
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faArrowCircleRight from '@fortawesome/fontawesome-free-solid/faArrowCircleRight'
import faUser from '@fortawesome/fontawesome-free-solid/faUser'
import faUserTie from '@fortawesome/fontawesome-free-solid/faUserTie'

import SteemUsernameInputComponent from './inputs/SteemUsernameInput.vue';

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
        voterIcon () {return faUser; },
        delegatorIcon () { return faUserTie; },
        voterUsername: {
            get (): string {
                return this.$store.state.voterUsername
            },
            set (value: string): void {
                this.$store.dispatch('setVoterUsername', value);
            }
        },
        delegatorUsername: {
            get (): string {
                return this.$store.state.delegatorUsername
            },
            set (value: string): void {
                this.$store.dispatch('setDelegatorUsername', value);
            }
        }
    },
    components: {
        FontAwesomeIcon,
        SteemUsernameInputComponent
    }
});
</script>

<style>
</style>
