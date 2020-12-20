<template>
    <div class="container">
        <ArticlePage :article="article" @getArticle="getArticle" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Home',
    layout: 'forestage',
    data() {
        return {
            article: {},
        };
    },
    created() {
        if (process.client) {
            this.getArticle();
        }
    },
    methods: {
        async getArticle() {
            try {
                const path = this.$route.path;
                const id = path.split('/article/')[1];
                const res = await this.$store.dispatch('getArticle', id);
                this.article = res;
            } catch (e) {}
        },
    },
});
</script>

<style lang="scss" scoped></style>
