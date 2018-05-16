<!-- src/components/Forms.vue -->
<template>
        <div>
            <usernames-form />
            <br /><br /><br /><br />

            <rule-selector-form />
            <br /><br /><br /><br />

            <vote-data-form />
            <br /><br /><br /><br />

            <send-form />
            <br /><br /><br /><br />
        </div>
</template>

<script lang="ts">
import Vue from "vue";
import UsernamesForm from "./UsernamesForm.vue";
import RuleSelectorForm from "./RuleSelectorForm.vue";
import VoteDataForm from "./VoteDataForm.vue";
import SendForm from "./SendForm.vue";


export default Vue.extend({
    props: [],
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
    },
    components: {
        UsernamesForm,
        RuleSelectorForm,
        VoteDataForm,
        SendForm,
    },
});
</script>

<style>
</style>
