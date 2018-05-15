<!-- src/components/form/inputs/SteemPostInput.vue -->
<template>
    <b-form-group
        id="post-slug-group"
        label="Post slug (category/@user/permlink) or steemit.com link"
        label-for="post-input"
        :invalid-feedback="invalidFeedback"
        :valid-feedback="validFeedback"
        :state="state"
    >
        <b-input-group>
            <b-input-group-text slot="prepend">
                <font-awesome-icon :icon="prependIcon" />
            </b-input-group-text>
            <input
                type="text" class="form-control form-control-lg"
                placeholder="https://steemit.com/category/@user/permlink"
                id="post-input"
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
import faBookmark from '@fortawesome/fontawesome-free-solid/faBookmark';

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
        prependIcon (): any { return faBookmark; },
        state (): boolean {
            return (!this.inputStarted) || this.value.length > 0 ? true : false;
        },
        invalidFeedback (): string {
            if (this.value.length > 0) {
                return '';
            } else {
                return 'Please enter post slug (category/@username/permlink) or paste steemit.com link';
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
