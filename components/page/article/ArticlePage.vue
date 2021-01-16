<template>
    <div class="p-20">
        <div class="flex justify-between text-xs text-gray-400">
            <div>
                建立時間：
                {{ $timeFormat.formatDateTime(article.createTime) }}
            </div>
            <div>
                最近一次更新時間：
                {{ $timeFormat.formatDateTime(article.updateTime) }}
            </div>
        </div>
        <div class="text-4xl my-8 text-red-700 font-black">
            {{ article.title }}
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="content" v-html="article.content"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ArticlePage',
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
