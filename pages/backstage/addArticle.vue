<template>
    <div class="container">
        <AddArticlePage @submit="submit" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'AddArticle',
    layout: 'backstage',
    methods: {
        async submit(params: object) {
            try {
                await this.$store.dispatch('createArticle', params);
            } catch (e) {}
        },
    },
});
</script>

<style lang="scss" scoped></style>
