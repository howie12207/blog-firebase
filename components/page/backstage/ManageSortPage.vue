<template>
    <div>
        <div class="flex m-4">
            <BaseInput
                ref="sortInput"
                v-model="title.value"
                :is-valid.sync="title.isValid"
                label="分類標題"
            />
            <div
                class="btn btn-secondary hover:btn-secondary self-start mt-1 ml-4"
                :class="{ 'btn-disabled': !title.isValid }"
                @click="addHandle"
            >
                新增分類
            </div>
        </div>
        <div class="flex">
            <div class="item font-bold">創建時間</div>
            <div class="item font-bold">標題</div>
            <div class="item font-bold">操作</div>
        </div>
        <div v-for="list in sorts" :key="list.id" class="flex">
            <div class="item">
                {{ $timeFormat.formatDateTime(list.createTime) }}
            </div>
            <template v-if="modifyTemp.id === list.id">
                <div class="title">
                    <BaseInput
                        v-model="modifyTitle.value"
                        :is-valid.sync="modifyTitle.isValid"
                    />
                </div>
                <div class="item">
                    <span
                        class="btn btn-secondary hover:btn-secondary"
                        :class="{ 'btn-disabled': !modifyTitle.isValid }"
                        @click="submitUpdate"
                        >送出</span
                    >
                    <span
                        class="btn btn-primary hover:btn-primary"
                        @click="cancelHandle"
                        >取消</span
                    >
                </div>
            </template>
            <template v-else>
                <div class="item">{{ list.title }}</div>
                <div class="item">
                    <span
                        class="btn btn-secondary hover:btn-secondary"
                        @click="updateHandle(list)"
                        >編輯</span
                    >
                    <span
                        class="btn btn-primary hover:btn-primary"
                        @click="deleteHandle(list.id)"
                        >刪除</span
                    >
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ManageSortPage',
    props: {
        sorts: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            modifyTemp: {} as any,
            title: {
                value: '',
                isValid: false,
            },
            modifyTitle: {
                value: '',
                isValid: true,
            },
        };
    },
    methods: {
        addHandle() {
            if (!this.title.isValid || !this.title.value) {
                this.$message.error('請填寫標題');
                return;
            }
            this.$emit('addSort', {
                title: this.title.value,
                createTime: Date.now(),
            });
            (this as any).$refs.sortInput.clear();
        },
        updateHandle(list: any) {
            this.modifyTemp = list;
            this.modifyTitle.value = list.title;
        },
        deleteHandle(id: string) {
            this.$emit('deleteSort', id);
        },
        cancelHandle() {
            this.modifyTitle.value = '';
            this.modifyTitle.isValid = true;
            this.modifyTemp = {};
        },
        submitUpdate() {
            if (!this.modifyTitle.isValid || !this.modifyTitle.value) {
                this.$message.error('請填寫標題');
                return;
            }
            this.$emit('updateSort', {
                id: this.modifyTemp.id,
                title: this.modifyTitle.value,
                createTime: this.modifyTemp.createTime,
            });
            this.cancelHandle();
        },
    },
});
</script>

<style lang="scss" scoped>
.item {
    @apply overflow-hidden whitespace-nowrap overflow-ellipsis p-4 w-1/3 text-center;
}
.title {
    @apply overflow-hidden whitespace-nowrap overflow-ellipsis py-2 px-4 w-1/3 text-center;
    ::v-deep .base_input {
        .left {
            .input_label {
                display: none;
            }
        }
        .right {
            .error_message {
                display: none;
            }
        }
    }
}
</style>
