<!-- src/components/form/inputs/PostingWifInput.vue -->
<template>
    <b-form-group
        id="posting-wif-group"
        label="Your posting key WIF"
        label-for="posting-wif"
        :invalid-feedback="invalidFeedback"
        :valid-feedback="validFeedback"
        :state="state"
    >
        <b-input-group>
            <b-input-group-text slot="prepend">
                <font-awesome-icon :icon="prependIcon" />
            </b-input-group-text>
            <input
                type="password" class="form-control"
                id="posting-wif"
                :state="state"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-on:keyup="startInput"
            />
        </b-input-group>
    </b-form-group>
</template>

<script lang="ts">
import Vue from "vue";
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import faShieldAlt from '@fortawesome/fontawesome-free-solid/faShieldAlt';

export default Vue.extend({
    props: ['value'],
    data() {
        return {
            inputStarted: false
        }
    },
    methods: {
        startInput (): void {
            this.inputStarted = true;
        }
    },
    computed: {
        prependIcon (): any { return faShieldAlt; },
        state (): boolean {
            return (!this.inputStarted) || this.value.length > 0 ? true : false;
        },
        invalidFeedback (): string {
            if (this.value.length > 0) {
                return '';
            } else {
                return 'Please enter valid posting key WIF';
            }
        },
        validFeedback (): string {
            return (this.inputStarted) && this.state === true ? 'This is correct' : '';
        }
    },
    components: {
        FontAwesomeIcon
    }
});
</script>

<style>
</style>
