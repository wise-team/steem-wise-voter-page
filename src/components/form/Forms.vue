<!-- src/components/Forms.vue -->
<template>
        <div>
            <div class="form-spacer">&nbsp;</div>

            <usernames-form />
            <div class="form-spacer">&nbsp;</div>

            <rule-selector-form />
            <div class="form-spacer">&nbsp;</div>

            <vote-data-form />
            <div class="form-spacer">&nbsp;</div>

            <send-form />
            <div class="form-spacer">&nbsp;</div>
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
