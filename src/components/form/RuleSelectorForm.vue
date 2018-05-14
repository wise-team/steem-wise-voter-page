<!-- src/components/RulesSelectorForm.vue -->
<template>
        <div>

        </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: [],
    data() {
        return {
            form: {
                email: '',
                name: '',
                food: null,
                checked: []
            },
            foods: [
                { text: 'Select One', value: null },
                'Carrots', 'Beans', 'Tomatoes', 'Corn'
            ],
            show: true
        }
    },
    methods: {
        onSubmit () {
            alert(JSON.stringify(this.form));
        },
        onReset () {
            this.form.email = '';
            this.form.name = '';
            this.form.food = null;
            this.form.checked = [];
            /* Trick to reset/clear native browser form validation state */
            this.show = false;
            this.$nextTick(() => { this.show = true });
        }
    },
    computed: {
    }
});
</script>

<style>
</style>
