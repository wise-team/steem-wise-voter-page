<!-- src/components/VoteDataForm.vue -->
<template>
        <div v-bind:class="[ isEnabled? 'component-enabled' : 'component-disabled text-muted' ]">
            <h4 class="text-muted">
                <span class="icon-span"><font-awesome-icon :icon="arrowRightIcon" /></span>
                &nbsp; Step 3: Specify vote details
            </h4>
            <b-form @submit.prevent="onSubmit"><b-container fluid>
                <b-row><b-col>
                    <steem-post-input-component :enabled="isEnabled" />
                </b-col></b-row>
                <b-row><b-col>
                    <weight-input-component :enabled="isEnabled" />
                </b-col></b-row>
                <b-row>
                    <b-col cols="12" sm="5" md="4"><p>
                        <button 
                            :class="[isButtonDisabled? 'btn btn-lg btn-secondary validate-voteorder-btn' : 'btn btn-lg btn-primary validate-voteorder-btn']"
                            :disabled="isButtonDisabled" @click="validateButtonClick"
                        >
                            Validate voteorder &nbsp;
                            <font-awesome-icon v-if="loadingInProggress" :icon="loadingIcon" spin />
                        </button>
                    </p></b-col>
                    <b-col cols="12" sm="7" md="8">
                    <p>
                        <b-alert variant="info" dismissible :show="loadingMessage.length > 0">{{ loadingMessage }}</b-alert>
                        <b-alert variant="danger" dismissible :show="loadingError.length > 0">{{ loadingError }}</b-alert>
                        <b-alert variant="success" :show="isVoteorderValid">Voteorder is valid</b-alert>
                    </p>
                    
                    </b-col>
                </b-row>
            </b-container></b-form>
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faArrowCircleRight from "@fortawesome/fontawesome-free-solid/faArrowCircleRight";
import faCog from "@fortawesome/fontawesome-free-solid/faCog";

import SteemPostInputComponent from "./inputs/SteemPostInput.vue";
import WeightInputComponent from "./inputs/WeightInput.vue";
import { Actions } from "../../store/actions";

export default Vue.extend({
    props: [],
    data() {
        return {
        };
    },
    methods: {
        validateButtonClick() {
            this.$store.dispatch(Actions.validateVoteorder);
        },
        onSubmit() { return; },
    },
    computed: {
        arrowRightIcon() { return faArrowCircleRight; },
        loadingIcon() { return faCog; },
        ...mapGetters({
            isEnabled: "voteDataFormEnabled",
        }),
        loadingInProggress(): boolean { return this.$store.state.voteorderValidationState.inProggress; },
        loadingMessage(): string { return this.$store.state.voteorderValidationState.message; },
        loadingError(): string { return this.$store.state.voteorderValidationState.error; },
        isButtonDisabled(): boolean {
            return !(
                this.$store.getters.validationButtonEnabled
            );
        },
        isVoteorderValid(): boolean { return this.$store.state.validated; },
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
