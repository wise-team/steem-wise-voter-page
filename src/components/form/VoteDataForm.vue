<!-- src/components/VoteDataForm.vue -->
<template>
        <div v-bind:class="[ isEnabled? 'component-enabled' : 'component-disabled text-muted' ]">
            <h4 class="text-muted">
                <span class="icon-span"><font-awesome-icon :icon="arrowRightIcon" /></span>
                &nbsp; Step 3: Specify vote details
            </h4>
            <b-form @submit.prevent="onSubmit"><b-container fluid>
                <b-row><b-col>
                    <steem-post-input-component v-model="postSlug" :enabled="isEnabled" />
                </b-col></b-row>
                <b-row><b-col>
                    <weight-input-component v-model="weight" :enabled="isEnabled" />
                </b-col></b-row>
            </b-container></b-form>
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faArrowCircleRight from "@fortawesome/fontawesome-free-solid/faArrowCircleRight";

import SteemPostInputComponent from "./inputs/SteemPostInput.vue";
import WeightInputComponent from "./inputs/WeightInput.vue";

export default Vue.extend({
    props: [],
    data() {
        return {
            postSlug: "",
            weight: 10000,
        };
    },
    methods: {

    },
    computed: {
        arrowRightIcon() { return faArrowCircleRight; },
        ...mapGetters({
            isEnabled: "voteDataFormEnabled",
        }),
    },
    components: {
        FontAwesomeIcon,
        SteemPostInputComponent,
        WeightInputComponent,
    },
});
</script>

<style>
</style>
