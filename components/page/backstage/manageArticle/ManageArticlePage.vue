<template>
    <div class="manage_article">
        <div class="table">
            <div class="table_title row">
                <div class="createTime">創建時間</div>
                <div class="title">標題</div>
                <div class="content">內容</div>
                <div class="operation">操作</div>
            </div>
            <div v-for="list in articles" :key="list.id" class="row">
                <div class="createTime">
                    {{ $timeFormat.formatDateTime(list.createTime) }}
                </div>
                <div class="title">{{ list.title }}</div>
                <div class="content">{{ list.content }}</div>
                <div class="operation">
                    <span class="btn" @click="updateHandle(list.id)">編輯</span>
                    <span class="btn" @click="deleteHandle(list.id)">刪除</span>
                </div>
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
.manage_article {
    .table {
        .table_title {
            font-weight: 600;
        }
        .row {
            display: flex;
            align-items: center;
            text-align: center;
            > div {
                padding: 16px;
                width: 25%;
            }
            .createTime {
                max-width: 180px;
            }
            .title,
            .content {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                flex-grow: 1;
            }
            .operation {
                max-width: 180px;
                .btn:first-child {
                    margin-right: 16px;
                }
            }
        }
    }
}
// table {
//     width: 100%;
// }
// tr {
//     width: 100%;
//     overflow: hidden;
// }
// td {
//     width: 100px;
//     span {
//         overflow: hidden;
//         white-space: nowrap;
//         text-overflow: ellipsis;
//     }
// }
</style>
