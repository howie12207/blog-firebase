<template>
    <div>
        <ModifyArticle
            target="modify"
            :article="article"
            @submit="submit"
            @getArticle="getArticle"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ManageArticleIdPage',
    props: {
        article: {
            type: Object,
            default: () => ({}),
        },
        target: {
            type: String,
            default: '',
        },
    },
    methods: {
        submit(params: object) {
            this.$emit('submit', params);
        },
        getArticle(params: object) {
            this.$emit('getArticle', params);
        },
    },
});
</script>

<style lang="scss" scoped></style>
