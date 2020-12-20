<template>
    <article class="article">
        <div class="time">
            <div class="create_time">
                建立時間：
                {{ $timeFormat.formatDateTime(article.createTime) }}
            </div>
            <div class="update_time">
                最近一次更新時間：
                {{ $timeFormat.formatDateTime(article.updateTime) }}
            </div>
        </div>
        <div class="title">{{ article.title }}</div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="content" v-html="article.content"></div>
    </article>
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
.article {
    background-color: #fff;
    padding: 80px 160px 0;
    .time {
        display: flex;
        justify-content: space-between;
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
        font-size: 16px;
        color: $gray4;
    }
}
</style>
