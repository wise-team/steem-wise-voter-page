<!-- src/components/form/inputs/WeightInput.vue -->
<template>
    <b-form-group
        id="weight-group"
        label="Weight of the vote and type (upvote or flag)"
        label-for="weight-input"
        :invalid-feedback="invalidFeedback"
        :valid-feedback="validFeedback"
        :state="state"
    >
        <b-input-group>
            <b-input-group-text slot="prepend">
                <b-form-radio-group id="vote-mode-radio-group" v-model="voteMode" :options="voteModeOptions" name="vote-mode"></b-form-radio-group>
            </b-input-group-text>
            <input
                type="text" class="form-control"
                id="weight-input"
                :state="state"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
            />
        </b-input-group>
    </b-form-group>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ['value'],
    data() {
        return {
            voteMode: 'upvote',
            voteModeOptions: ['upvote', 'flag']
        }
    },
    methods: {
    },
    computed: {
        state (): boolean {
            // TODO validate weight
            return this.value.length > 0 ? true : false;
        },
        invalidFeedback (): string {
            if (this.value.length > 0) {
                return '';
            } else {
                return 'Please enter valid weight';
            }
        },
        validFeedback (): string {
            return this.state === true ? 'This is correct' : '';
        }
    },
    components: {
    }
});
</script>

<style>
</style>
