<!-- src/components/UsernamesForm.vue -->
<template>
        <div>
            <h4 class="text-muted">
                <font-awesome-icon :icon="arrowRightIcon" />
                &nbsp; Step 1: Type your &amp; your delegator username
            </h4>
            <b-form @submit.prevent="onSubmit">
                <b-container fluid>
                    <b-row><b-col>
                        <steem-username-input-component label="Your (voter) username" :icon="voterIcon" />
                    </b-col>
                    <b-col>
                        <steem-username-input-component label="Delegator username" :icon="delegatorIcon" />
                    </b-col></b-row>
                </b-container>
            </b-form>
            <br />
            <hr />
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
            voterUsername: '',
            delegatorUsername: ''
        }
    },
    methods: {
    },
    computed: {
        arrowRightIcon () { return faArrowCircleRight; },
        voterIcon () {return faUser; },
        delegatorIcon () { return faUserTie; }
    },
    components: {
        FontAwesomeIcon,
        SteemUsernameInputComponent
    }
});
</script>

<style>
    h4 {
        /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
    }
</style>
