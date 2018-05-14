<!-- src/components/form/inputs/SteemUsernameInput.vue -->
<template>
    <b-form-group
        id="username-group"
        :label="label"
        label-for="username-input"
        :invalid-feedback="invalidFeedback"
        :valid-feedback="validFeedback"
        :state="state"
    >
        <b-input-group>
            <b-input-group-text slot="prepend">
                <font-awesome-icon :icon="prependIcon" />
            </b-input-group-text>
            <b-form-input id="username-input" :state="state" v-model.trim="username"></b-form-input>
        </b-input-group>
    </b-form-group>
</template>

<script lang="ts">
import Vue from "vue";
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default Vue.extend({
    props: ['label', 'icon'],
    data() {
        return {
            username: ''
        }
    },
    methods: {
    },
    computed: {
        prependIcon (): any { return this.icon; },
        state (): boolean {
            return this.username.length > 0 ? true : false;
        },
        invalidFeedback (): string {
            if (this.username.length > 0) {
                return '';
            } else {
                return 'Please enter steem username';
            }
        },
        validFeedback (): string {
            return this.state === true ? 'This is correct username' : '';
        }
    },
    components: {
        FontAwesomeIcon
    }
});

// TODO check if username exists
// TODO pass to parent
</script>

<style>
    h4 {
        /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
    }
</style>
