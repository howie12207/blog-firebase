<template>
    <div>
        <div class="flex">
            <div class="item font-bold">創建時間</div>
            <div class="item font-bold">標題</div>
            <div class="item font-bold">內容</div>
            <div class="item font-bold">操作</div>
        </div>
        <div v-for="list in articles" :key="list.id" class="flex">
            <div class="item">
                {{ $timeFormat.formatDateTime(list.createTime) }}
            </div>
            <div class="item">
                {{ list.title }}
            </div>
            <div class="item">
                {{ list.content }}
            </div>
            <div class="item">
                <span
                    class="btn btn-secondary hover:btn-secondary"
                    @click="updateHandle(list.id)"
                    >編輯</span
                >
                <span
                    class="btn btn-primary hover:btn-primary"
                    @click="deleteHandle(list.id)"
                    >刪除</span
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ManageArticlePage',
    props: {
        articles: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {};
    },
    methods: {
        updateHandle(id: string) {
            this.$router.push(`/backstage/manageArticle/${id}`);
        },
        deleteHandle(id: string) {
            this.$emit('deleteArticle', id);
        },
    },
});
</script>

<style lang="scss" scoped>
.item {
    @apply overflow-hidden whitespace-nowrap overflow-ellipsis p-4 w-1/4 text-center;
}
</style>
