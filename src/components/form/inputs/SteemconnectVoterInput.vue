<!-- src/components/form/inputs/SteemconnectVoterInput.vue -->
<template>
    <b-form-group
        id="username-group"
        label="Your (voter) username"
        label-for="steemconnect-voter-input-field"
    >
        <b-input-group>
            <b-input-group-text class="steemconnect-voter-input-prepender" slot="prepend">
                <img src="/assets/steemconnect-icon.svg">
                &nbsp;+&nbsp;
                <img v-if="value.length > 0" :src="'https://steemitimages.com/u/' + value + '/avatar'" alt="Voter avatar" />
                <font-awesome-icon v-else :icon="loadingIcon" spin />
            </b-input-group-text>
            <input
                type="text" class="form-control"
                id="steemconnect-voter-input-field"
                v-bind:value="value"
                disabled
            />
        </b-input-group>
    </b-form-group>
</template>

<script lang="ts">
import Vue from "vue";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faSpinner from "@fortawesome/fontawesome-free-solid/faSpinner";

export default Vue.extend({
    props: ["value"],
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
        loadingIcon() { return faSpinner; },
    },
    components: {
        FontAwesomeIcon,
    },
});
</script>

<style>
.steemconnect-voter-input-prepender img {
    height: 2rem;
}
</style>
