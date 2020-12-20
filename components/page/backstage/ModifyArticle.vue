<template>
    <div class="add_article">
        <BaseInput
            v-model="title.value"
            label="標題"
            :is-valid.sync="title.isValid"
        />
        <div class="label">內容</div>
        <div class="row">
            <div
                :class="['btn', { active: contentTab === 'html' }]"
                @click="changeTab('html')"
            >
                HTML
            </div>
            <div
                :class="['btn', { active: contentTab === 'editor' }]"
                @click="changeTab('editor')"
            >
                文本編輯
            </div>
        </div>
        <el-input
            v-if="contentTab === 'html'"
            v-model="content"
            type="textarea"
            :rows="10"
            placeholder="请输入内容"
        ></el-input>
        <div
            v-else
            v-quill:myQuillEditor="editorOption"
            :content="content"
            class="quill-editor"
            style="height: 500px"
            @change="onEditorChange($event)"
        ></div>
        <div class="btn" @click="submit">送出</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ModifyArticle',
    props: {
        target: {
            type: String,
            default: '',
        },
        article: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            contentTab: 'html',
            title: {
                value: '',
                isValid: false,
            },
            content: '',
            editorOption: {
                bounds: 'app',
                placeholder: '',
                modules: {
                    toolbar: {
                        container: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ header: 1 }, { header: 2 }],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ script: 'sub' }, { script: 'super' }],
                            [{ indent: '-1' }, { indent: '+1' }],
                            [{ direction: 'rtl' }],
                            [{ size: ['small', false, 'large', 'huge'] }],
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            [{ color: [] }, { background: [] }],
                            [{ font: [] }],
                            [{ align: [] }],
                            ['clean'],
                            ['image'],
                        ],
                    },
                },
            },
        };
    },
    watch: {
        article() {
            this.title.value = this.article.title;
            this.title.isValid = true;
            this.content = this.article.content;
        },
    },
    methods: {
        changeTab(target: string) {
            const toolbar = document.querySelector('.ql-toolbar');
            if (toolbar) {
                (toolbar as any).parentNode.removeChild(toolbar);
            }
            this.contentTab = target;
        },
        onEditorChange({ html }: any) {
            this.content = html;
        },
        submit() {
            if (!this.title.isValid) {
                this.$message.error('請填寫標題');
                return;
            } else if (!this.content) {
                this.$message.error('請填寫內容');
                return;
            }
            const now = Date.now();
            this.$emit('submit', {
                title: this.title.value,
                content: this.content,
                createTime: this.target ? this.article.createTime : now,
                updateTime: now,
            });
        },
    },
});
</script>

<style lang="scss" scoped></style>
