<template>
    <header class="header">
        <div class="btn" @click="popup('login')">
            <i class="el-icon-user icon"></i>登入
        </div>
        <Popup v-if="popupTarget === 'login'" @close="closePopup">
            <template #layer>
                <Login @login="login" />
            </template>
        </Popup>
    </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ForestageHeader',
    data() {
        return {
            popupTarget: '',
        };
    },
    methods: {
        popup(target: string) {
            this.popupTarget = target;
        },
        closePopup() {
            this.popupTarget = '';
        },
        login(params: object) {
            this.$emit('login', params);
        },
        register() {},
    },
});
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    height: $num * 7;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: $gray3;

    .btn {
        display: flex;
        align-items: center;
        margin-right: 16px;
        .icon {
            margin-right: 8px;
        }
    }
}
</style>
