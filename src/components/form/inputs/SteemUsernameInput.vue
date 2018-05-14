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
            <input
                type="text" class="form-control"
                id="username-input"
                :state="state"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
            />
        </b-input-group>
    </b-form-group>
</template>

<script lang="ts">
import Vue from "vue";
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default Vue.extend({
    props: ['label', 'icon', 'value'],
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        prependIcon (): any { return this.icon; },
        state (): boolean {
            return this.value.length > 0 ? true : false;
        },
        invalidFeedback (): string {
            if (this.value.length > 0) {
                return '';
            } else {
                return 'Please enter steem username';
            }
        },
        validFeedback (): string {
            return this.state === true ? 'This is correct. Please click below to check if it exists.' : '';
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
