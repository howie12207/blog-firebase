<template>
    <div class="container"><HomePage :articles="articles" /></div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Home',
    layout: 'forestage',
    data() {
        return {
            articles: [] as any,
        };
    },
    created() {
        if (process.client) {
            this.getArticles();
        }
    },
    methods: {
        async getArticles() {
            try {
                const res = await this.$store.dispatch('getArticles');
                this.articles = res;
            } catch (e) {}
        },
    },
});
</script>

<style lang="scss" scoped></style>
