<template>
    <div :class="['base_input', { multi_line: multiLine }]">
        <div class="left">
            <div class="input_label top">{{ label }}</div>
            <div class="left_bottom bottom"></div>
        </div>
        <div class="right">
            <div :class="['input_block', 'top']">
                <input
                    v-model="syncValue"
                    :type="type"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :upper-case="upperCase"
                    :class="[
                        'input_content',
                        {
                            error: blurInput && (!isValid || errorMessage),
                        },
                        { clear_btn: clearBtn },
                    ]"
                    @keyup="onKeyup(value)"
                    @blur="onBlur(value)"
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
            <div class="error_message bottom">
                <div
                    v-if="blurInput && !isValid && !errorMessage"
                    class="error"
                >
                    <span v-if="rules.min && rules.max">{{
                        '請輸入' + rules.min + ' ~ ' + rules.max + rulesLimit
                    }}</span>
                    <span v-else-if="rules.only">{{
                        '請輸入' + rules.only + '個數字'
                    }}</span>
                    <span v-else-if="rules.atLeast">{{
                        '請輸入至少' + rules.atLeast + '個字元'
                    }}</span>
                    <span v-else-if="rules.limit === 'mail'"
                        >電子信箱格式錯誤</span
                    >
                </div>
                <div v-else-if="errorMessage && blurInput" class="error">
                    {{ errorMessage }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
        multiLine: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            blurInput: false,
            error: null,
            clearBtnShow: false,
        };
    },
    computed: {
        syncValue: {
            get() {
                return this.value;
            },
            set(value) {
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
                : this.rules.limit === 'en'
                ? '位英文'
                : '個字元';
        },
    },
    methods: {
        onBlur(value) {
            if (!this.blurInput) this.blurInput = true;
            this.validate(value);
            this.$emit('onBlur', value);
        },
        onKeyup(value) {
            this.clearBtnShow = value.length > 0;
            this.$emit('onKeyup', value);
            this.$nextTick(() => this.validate(value));
        },
        onKeydown(e) {
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
        validate(value) {
            let isValid = true;
            if (Object.keys(this.rules).length > 0 && value) {
                const typeLimit = this.typeRules(value, this.rules.limit);
                const lengthLimit = this.lengthRules(value);
                isValid = typeLimit && lengthLimit && !this.errorMessage;
            }
            if (!value) {
                isValid = false;
                if (this.notRequired) isValid = true;
            }
            this.$emit('update:isValid', isValid);
        },
        typeRules(value, type) {
            const METHOD = {
                enAndNumber() {
                    return /^[a-zA-Z0-9]*$/.test(value);
                },
                en() {
                    return /^[a-zA-Z]*$/.test(value);
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
        lengthRules(value) {
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
            this.blurInput = false;
            this.clearBtnShow = false;
            this.$emit('update:isValid', this.notRequired);
        },
    },
});
</script>

<style lang="scss" scoped>
.base_input {
    display: flex;
    flex-wrap: wrap;
    &.multi_line {
        display: block;
    }
    font-size: 14px;
    color: #6b7280;
    .top {
        height: 40px;
        line-height: 40px;
    }
    .input_label {
        min-width: 80px;
    }
    .input_block {
        position: relative;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        .input_content {
            width: 100%;
            height: 100%;
            padding: 0 32px 0 16px;
            border: 1px solid#D1D5DB;
            border-radius: 4px;
            transition: 0.3s;
            outline: none;
            &:focus {
                border: 1px solid #3b82f6;
            }
            &.error {
                border: 1px solid #ef4444;
            }
        }
        .clear {
            position: absolute;
            right: 10px;
            top: 0;
            width: 16px;
            height: 16px;
            font-size: 14px;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
                opacity: 0.8;
            }
        }
    }
    .error_message {
        height: 12px;
        font-size: 12px;
        margin: 8px 0;
        color: #ef4444;
    }
    * {
        box-sizing: border-box;
    }
}
</style>
