<template>
    <div class="container">
        <ModifyArticle
            target="modify"
            :article="article"
            @submit="updateArticle"
            @getArticle="getArticle"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ManageArticleId',
    layout: 'backstage',
    data() {
        return {
            article: {},
        };
    },
    async created() {
        if (process.client) {
            await this.getArticle();
        }
    },
    methods: {
        async updateArticle(params: { id: string }) {
            try {
                const id = this.$route.path.split('/manageArticle/')[1];
                params.id = id;
                await this.$store.dispatch('updateArticle', params);
            } catch (e) {}
        },
        async getArticle() {
            try {
                const id = this.$route.path.split('/manageArticle/')[1];
                const res = await this.$store.dispatch('getArticle', id);
                this.article = res;
            } catch (e) {}
        },
    },
});
</script>

<style lang="scss" scoped></style>
