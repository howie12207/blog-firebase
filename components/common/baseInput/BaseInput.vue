<template>
    <div class="base_input">
        <label class="input_label">{{ label }}</label>
        <div class="row_right">
            <div class="input_block">
                <input
                    v-model="syncValue"
                    :type="type"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :upper-case="upperCase"
                    :class="[
                        'input_content',
                        {
                            error: !isLimitPass || (errorMessage && clearFlag),
                        },
                        { clear_btn: clearBtn },
                    ]"
                    @keyup="onKeyup(value)"
                    @change="onChange(value)"
                    @keydown="onKeydown"
                />
                <div
                    v-if="clearBtn && clearBtnShow"
                    class="clear"
                    @click="clear"
                >
                    <i class="el-icon-circle-close"></i>
                </div>
            </div>
            <div class="error_message">
                <div v-if="!isLimitPass && !errorMessage" class="error">
                    <span v-if="rules.min && rules.max">{{
                        '請輸入' + rules.min + ' ~ ' + rules.max + rulesLimit
                    }}</span>
                    <span v-if="rules.only">{{
                        '請輸入' + rules.only + '個數字'
                    }}</span>
                    <span v-if="rules.limit === 'mail'">電子信箱格式錯誤</span>
                    <span v-if="rules.atLeast"
                        >请输入至少 {{ rules.atLeast }} 個字元</span
                    >
                </div>
                <div v-if="errorMessage && clearFlag" class="error">
                    {{ errorMessage }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'BaseInput',
    props: {
        label: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        upperCase: {
            type: Boolean,
            default: false,
        },
        rules: {
            type: Object,
            default: () => ({}),
        },
        errorMessage: {
            type: String,
            default: '',
        },
        isValid: {
            type: Boolean,
            default: false,
        },
        notRequired: {
            type: Boolean,
            default: false,
        },
        clearBtn: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            blurInput: false,
            error: null,
            isLimitPass: true,
            clearFlag: true,
            clearBtnShow: false,
        };
    },
    computed: {
        syncValue: {
            get() {
                return this.value;
            },
            set(value: string) {
                if (this.upperCase) {
                    this.$emit('input', value.toUpperCase());
                } else {
                    this.$emit('input', value);
                }
            },
        },
        rulesLimit() {
            return this.rules.limit === 'enAndNumber'
                ? '位英文或數字'
                : this.rules.limit === 'number'
                ? '位數字'
                : '個字元';
        },
    },
    methods: {
        onChange(value: string) {
            if (!this.blurInput) this.blurInput = true;
            this.validate(value);
            this.$emit('change', value);
        },
        onKeyup(value: string) {
            if (this.blurInput) this.validate(value);
            if (!this.clearFlag) this.clearFlag = true;
            this.clearBtnShow = value.length > 0;
            this.$emit('onKeyup', value);
        },
        onKeydown(e: any) {
            if (this.rules.limit === 'number') {
                if (
                    e.keyCode === 190 ||
                    e.keyCode === 189 ||
                    e.keyCode === 187 ||
                    e.keyCode === 69
                ) {
                    e.preventDefault();
                }
            }
        },
        validate(value: string) {
            if (Object.keys(this.rules).length > 0 && value) {
                const langLimit = this.langRules(value, this.rules.limit);
                const textLimit = this.textLengthRules(value);
                this.isLimitPass = langLimit && textLimit && !this.errorMessage;
            }
            if (!value) {
                this.isLimitPass = false;
                if (this.notRequired) this.isLimitPass = true;
            }
            this.$emit('update:isValid', this.isLimitPass);
        },
        langRules(value: string, type: string): boolean {
            const METHOD: any = {
                enAndNumber() {
                    return /^[a-zA-Z0-9]*$/.test(value);
                },
                number() {
                    return !/[^0-9]/.test(value);
                },
                mail() {
                    return /\S+@\S+\.\S+/.test(value);
                },
            };
            return (
                !type ||
                !Object.prototype.hasOwnProperty.call(METHOD, type) ||
                METHOD[type]()
            );
        },
        textLengthRules(value: string) {
            if (this.rules.min && this.rules.max) {
                return (
                    value.length >= this.rules.min &&
                    value.length <= this.rules.max
                );
            } else if (this.rules.only) {
                return value.length === this.rules.only;
            } else if (this.rules.atLeast) {
                return value.length >= this.rules.atLeast;
            }
            return true;
        },
        clear() {
            this.syncValue = '';
            this.isLimitPass = true;
            this.clearFlag = false;
            this.clearBtnShow = false;
            this.$emit('update:isValid', this.notRequired);
        },
    },
});
</script>

<style lang="scss" scoped>
.base_input {
    display: flex;
    /* max-width: 640px; */
    font-size: 14px;
    color: #45494c;
    .input_label {
        width: 64px;
        height: 40px;
        line-height: 40px;
    }
    .row_right {
        flex-grow: 1;
    }
    .input_block {
        position: relative;
        box-shadow: 0 2px 5px 0 rgba(15, 39, 51, 0.2);
        border-radius: 4px;
        .input_content {
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding: 0 32px 0 16px;
            border: 1px solid transparent;
            border-radius: 4px;
            transition: 0.3s;
            outline: none;
            &:focus {
                border: 1px solid #409eff;
            }
            &.error {
                border: 1px solid #ff4d4d;
            }
        }
        .clear {
            position: absolute;
            vertical-align: top;
            right: 10px;
            top: 10px;
            width: 16px;
            height: 16px;
            font-size: 14px;
            cursor: pointer;
            transition: 0.3;
            &:hover {
                opacity: 0.8;
            }
        }
    }
    .error_message {
        height: 32px;
        padding: 8px 0;
        font-size: 12px;
        color: #ff4d4d;
    }
}
</style>
