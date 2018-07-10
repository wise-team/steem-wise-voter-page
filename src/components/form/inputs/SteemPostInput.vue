<!-- src/components/form/inputs/SteemPostInput.vue -->
<template>
    <b-form-group
        id="post-slug-group"
        label="Post slug ([category/]@user/permlink) or [steemit.com, busy.org] link"
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
                v-model="postSlug"
                v-on:keyup="startInput"
                :disabled="!enabled"
            />
        </b-input-group>
    </b-form-group>
</template>

<script lang="ts">
import Vue from "vue";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faBookmark from "@fortawesome/fontawesome-free-solid/faBookmark";

import { Mutations } from "../../../store/mutations";

export default Vue.extend({
    props: ["enabled"],
    data() {
        return {
            inputStarted: false,
            slugText : "",
        };
    },
    methods: {
        startInput(): void {
            this.inputStarted = true;
        },
    },
    computed: {
        prependIcon(): any { return faBookmark; },
        state(): boolean {
            if (!this.inputStarted) return true;
            else return (
                this.$store.state.voteData.author.length > 0 &&
                this.$store.state.voteData.permlink.length > 0);
        },
        invalidFeedback(): string {
            return "Please enter post slug ([category/]@username/permlink) or paste steemit.com link";
        },
        validFeedback(): string {
            return (this.inputStarted) && this.state === true ? "This is correct" : "";
        },
        postSlug: {
            get(): string {
                if (
                    this.$store.state.voteData.author.length > 0 &&
                    this.$store.state.voteData.permlink.length > 0
                ) {
                    return "@" +
                        this.$store.state.voteData.author + "/" +
                        this.$store.state.voteData.permlink;
                } else return this.slugText;
            },
            set(value: string): void {
                let author = "";
                let permlink = "";
                if (value.length > 0) {
                    /* tslint:disable max-line-length */
                    const regex = /^\/?(?:https?:\/\/(?:steemit\.com|busy\.org))?(?:\/?[^\/\n]*\/)?@?([^\/\n]+)\/([^\/\n]+)$/giu;
                    /* tslint:disable max-line-length */
                    const match = regex.exec(value);
                    if (match && match.length > 1) {
                        author = match[1];
                        permlink = match[2];
                    }
                }
                const voteData = {
                        author: author,
                        permlink: permlink,
                        weight: this.$store.state.voteData.weight,
                        action: this.$store.state.voteData.action,
                    };
                this.$store.commit(Mutations.setVoteData, voteData);
                this.slugText = value;
            },
        },
    },
    components: {
        FontAwesomeIcon,
    },
});
</script>

<style>
</style>
