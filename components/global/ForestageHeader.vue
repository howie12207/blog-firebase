<template>
    <header
        class="fixed z-10 w-full h-14 flex justify-end bg-gray-600 items-center"
    >
        <div class="btn btn-primary hover:btn-primary" @click="popup('login')">
            <i class="el-icon-user icon"></i> 登入
        </div>
        <Popup v-if="popupTarget === 'login'" @close="closePopup">
            <template #layer>
                <Login v-on="$listeners" />
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
        register() {},
    },
});
</script>
