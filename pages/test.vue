<template>
    <div class="container">
        <BaseInput
            v-model="test.value"
            label="pwd"
            :is-valid.sync="test.isValid"
            :rules="test.rules"
            @onKeyup="confirmPassword"
        />
        <BaseInput
            ref="confirmPwd"
            v-model="test2.value"
            label="confirmpwd"
            :is-valid.sync="test2.isValid"
            :error-message="test2.errorMessage"
            @onKeyup="confirmPassword"
            @onBlur="confirmPassword"
        />
        <div
            :class="[
                'btn',
                'p-5',
                'bg-red-600',
                'font-bold',
                { disabled: !test.isValid || !test2.isValid },
            ]"
        >
            套用
        </div>
        <BaseInput
            v-model="test3.value"
            label="firstName"
            :is-valid.sync="test3.isValid"
            :rules="test3.rules"
        />
        <BaseInput
            v-model="test4.value"
            label="lastName"
            :is-valid.sync="test4.isValid"
            :rules="test4.rules"
        />
        <div :class="['btn', { disabled: !test3.isValid || !test4.isValid }]">
            套用
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Test',
    layout: 'forestage',
    data() {
        return {
            test: {
                value: '',
                isValid: false,
                rules: {
                    min: 6,
                    max: 10,
                    limit: 'enAndNumber',
                },
            },
            test2: {
                value: '',
                isValid: false,
                rules: {
                    min: 6,
                    max: 10,
                    limit: 'enAndNumber',
                },
                errorMessage: '',
            },
            test3: {
                value: '',
                isValid: false,
                rules: {
                    min: 1,
                    max: 10,
                    limit: 'en',
                },
            },
            test4: {
                value: '',
                isValid: false,
                rules: {
                    min: 1,
                    max: 10,
                    limit: 'en',
                },
            },
            test5: {
                value: '',
                isValid: false,
                rules: {
                    min: 6,
                    max: 10,
                    limit: 'number',
                },
                errorMessage: '',
            },
        };
    },
    methods: {
        confirmPassword() {
            if (this.test.value !== this.test2.value) {
                this.test2.errorMessage = 'error';
            } else {
                this.test2.errorMessage = '';
                (this as any).$refs.confirmPwd.isLimitPass = true;
            }
        },
    },
});
</script>

<style lang="scss" scoped>
.btn {
    // &.disabled {
    //     background-color: #ccc;
    //     cursor: not-allowed;
    // }
}
</style>
