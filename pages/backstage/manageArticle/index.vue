<template>
    <div class="container">
        <ManageArticlePage
            :articles="articles"
            @deleteArticle="deleteArticle"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ManageArticle',
    layout: 'backstage',
    meta: {
        layout: 'backstage',
    },
    data() {
        return {
            articles: [],
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
        async deleteArticle(id: string) {
            try {
                await this.$store.dispatch('deleteArticle', id);
                await this.getArticles();
            } catch (e) {}
        },
    },
});
</script>
