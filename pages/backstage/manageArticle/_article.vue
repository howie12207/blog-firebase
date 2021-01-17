<template>
    <div class="container">
        <ModifyArticle
            target="modify"
            :article="article"
            :sorts="sorts"
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
    meta: {
        layout: 'backstage',
    },
    data() {
        return {
            article: {},
            sorts: [],
        };
    },
    async created() {
        if (process.client) {
            await this.getSorts();
            await this.getArticle();
        }
    },
    methods: {
        async getSorts() {
            try {
                const res = await this.$store.dispatch('getSorts');
                this.sorts = res;
            } catch (e) {}
        },
        async getArticle() {
            try {
                const id = this.$route.path.split('/manageArticle/')[1];
                const res = await this.$store.dispatch('getArticle', id);
                this.article = res;
            } catch (e) {}
        },
        async updateArticle(params: { id: string }) {
            try {
                const id = this.$route.path.split('/manageArticle/')[1];
                params.id = id;
                await this.$store.dispatch('updateArticle', params);
                this.$router.push('/backstage/manageArticle');
            } catch (e) {}
        },
    },
});
</script>
