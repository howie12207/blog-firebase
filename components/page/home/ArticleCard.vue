<template>
    <article class="article">
        <div class="create_time">
            {{ $timeFormat.formatDate(article.createTime) }}
        </div>
        <div class="title">{{ article.title }}</div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="content" v-html="article.content"></div>
        <nuxt-link :to="`/article/${article.id}`" class="more"
            >閱讀全文..</nuxt-link
        >
    </article>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ArticleCard',
    props: {
        article: {
            type: Object,
            default: () => ({}),
        },
    },
});
</script>

<style lang="scss" scoped>
.article {
    background-color: #fff;
    padding: 16px;
    margin-bottom: 40px;
    .create_time {
        font-size: 12px;
        margin-bottom: 8px;
        color: $gray2;
    }
    .title {
        font-size: 24px;
        font-weight: 900;
        line-height: 2;
        color: $gray4;
    }
    .content {
        max-height: 120px;
        font-size: 16px;
        line-height: 1.5;
        color: $gray4;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        display: -webkit-box;
    }
    .more {
        display: inline-block;
        margin: 16px 0;
        text-align: right;
        text-decoration: underline;
        cursor: pointer;
    }
}
</style>
