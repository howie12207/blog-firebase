<!-- eslint-disable vue/no-v-html -->
<template>
    <article class="my-4">
        <div class="text-right text-xs mb-2">
            {{ $timeFormat.formatDate(article.createTime) }}
        </div>
        <div class="text-4xl mb-8 text-red-700 font-black">
            {{ article.title }}
        </div>
        <div
            class="content overflow-hidden overflow-ellipsis max-h-40"
            v-html="article.content"
        ></div>
        <nuxt-link
            :to="`/article/${article.id}`"
            class="text-red-400 underline inline-block my-1"
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
::v-deep .content {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    p {
        @apply my-4;
        text-indent: 2rem;
    }
    li {
        @apply my-2 ml-8 text-sm list-disc;
    }
    pre {
        @apply rounded py-2 px-4 bg-black text-white whitespace-pre-wrap;
    }
}
</style>
