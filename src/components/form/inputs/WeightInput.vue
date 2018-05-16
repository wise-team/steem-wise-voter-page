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
                <b-form-radio-group id="vote-mode-radio-group" v-model="voteMode" :options="voteModeOptions" name="vote-mode" :disabled="!enabled"></b-form-radio-group>
            </b-input-group-text>
            <input
                type="text" class="form-control"
                id="weight-input"
                :state="state"
                v-bind:value="value"
                v-on:input="$emit('input', $event.target.value)"
                v-on:keyup="startInput"
                :disabled="!enabled"
            />
            <b-input-group-text slot="append">
                <font-awesome-icon :icon="appendIcon" />
            </b-input-group-text>
        </b-input-group>
    </b-form-group>
</template>

<script lang="ts">
import Vue from "vue";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faWeight from "@fortawesome/fontawesome-free-solid/faWeight";

export default Vue.extend({
    props: ["value", "enabled"],
    data() {
        return {
            voteMode: "upvote",
            voteModeOptions: ["upvote", "flag"],
            inputStarted: false,
        };
    },
    methods: {
        startInput(): void {
            this.inputStarted = true;
        },
    },
    computed: {
        appendIcon(): any { return faWeight; },
        state(): boolean {
            // TODO validate weight
            return (!this.inputStarted) || this.value.length > 0 ? true : false;
        },
        invalidFeedback(): string {
            if (this.value.length > 0) {
                return "";
            } else {
                return "Please enter valid weight";
            }
        },
        validFeedback(): string {
            return (this.inputStarted) && this.state === true ? "This is correct" : "";
        },
    },
    components: {
        FontAwesomeIcon,
    },
});
</script>

<style>
</style>
