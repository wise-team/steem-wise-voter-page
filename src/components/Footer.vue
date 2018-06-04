<!-- src/components/Footer.vue -->
<template>
    <div>
        <footer class="my-5 pt-3 mt-4 text-muted text-center text-small">
            <strong>More info</strong>, star &amp; fork on
            <b-button variant="outline-secondary" size="sm" href="https://github.com/noisy-witness/steem-wise-core">
                <font-awesome-icon :icon="githubIcon" /> /noisy-witness/steem-smartvotes-core
            </b-button>
            <p> </p>
            <p style="font-size: 0.75rem;">
                Source of this page: <a href="https://github.com/noisy-witness/steem-wise-voter-page">github.com/noisy-witness/steem-smartvotes-voter-page</a>. <br />
                &copy; 2018-2018 by <a href="https://steemit.com/@noisy.witness">noisy.witness</a>. 
                Under MIT license.
            </p>
        </footer>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import faGithub from "@fortawesome/fontawesome-free-brands/faGithub";

export default Vue.extend({
    props: [],
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
        githubIcon() {
            return faGithub;
        },
    },
    components: {
        FontAwesomeIcon,
    },
});
</script>

<style>
</style>
