<template>
    <div class="login">
        <BaseInput
            v-model="mail.value"
            label="電子信箱"
            :is-valid.sync="mail.isValid"
            :rules="mail.rules"
        />
        <BaseInput
            v-model="password.value"
            label="密碼"
            type="password"
            :is-valid.sync="password.isValid"
            :rules="password.rules"
        />
        <div class="row">
            <div class="btn blue_btn" @click="login">登入</div>
            <div class="btn orange_btn" @click="register">註冊</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'Login',
    data() {
        return {
            mail: {
                value: '',
                isValid: false,
                rules: {
                    limit: 'mail',
                },
            },
            password: {
                value: '',
                isValid: false,
                rules: {
                    min: 6,
                    max: 20,
                    limit: 'enAndNumber',
                },
            },
        };
    },
    created() {
        if (process.client) {
            // this.$message.success('123');
        }
    },
    methods: {
        login() {
            if (!this.mail.isValid || !this.password.isValid) {
                this.$message.error('請填寫正確信息');
                return;
            }
            this.$emit('login', {
                mail: this.mail.value,
                password: this.password.value,
            });
        },
        register() {
            this.$emit('register');
        },
    },
});
</script>

<style lang="scss" scoped>
.login {
    .row {
        display: flex;
        justify-content: space-evenly;
        .blue_btn {
            background-color: $blue4;
        }
        .orange_btn {
            background-color: $orange;
        }
    }
}
</style>
