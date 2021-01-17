<template>
    <div class="container">
        <AddArticlePage :sorts="sorts" @submit="submit" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'AddArticle',
    layout: 'backstage',
    meta: {
        layout: 'backstage',
    },
    data() {
        return {
            sorts: [],
        };
    },
    created() {
        if (process.client) {
            this.getSorts();
        }
    },
    methods: {
        async getSorts() {
            try {
                const res = await this.$store.dispatch('getSorts');
                this.sorts = res;
            } catch (e) {}
        },
        async submit(params: object) {
            try {
                await this.$store.dispatch('createArticle', params);
                this.$router.push('/backstage/manageArticle');
            } catch (e) {}
        },
    },
});
</script>
