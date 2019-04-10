<!-- src/components/form/inputs/SteemUsernameInput.vue -->
<template>
    <b-form-group
        id="username-group"
        :label="label"
        :label-for="'username-input-' + id"
        :invalid-feedback="invalidFeedback"
        :valid-feedback="validFeedback"
        :state="state"
    >
        <b-input-group>
            <b-input-group-text class="steemusernameinput-prepender" slot="prepend">
                <font-awesome-icon :icon="prependIcon" />
            </b-input-group-text>
            <input
                type="text" class="form-control"
                :id="'username-input-' + id"
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default Vue.extend({
    props: ["label", "icon", "value", "id"],
    data() {
        return {
            inputStarted: false,
        };
    },
    methods: {
        startInput(): void {
            this.inputStarted = true;
        },
    },
    computed: {
        prependIcon(): any { return this.icon; },
        state(): boolean {
            return (!this.inputStarted) || this.value.length > 0 ? true : false;
        },
        invalidFeedback(): string {
            if (this.value.length > 0) {
                return "";
            } else {
                return "Please enter steem username";
            }
        },
        validFeedback(): string {
            return (this.inputStarted) &&
                this.state === true ? "This is correct. Please click below to check if it exists." : "";
        },
    },
    components: {
        FontAwesomeIcon,
    },
});
</script>

<style>
.steemusernameinput-prepender svg {
    height: 2rem;
}
</style>
