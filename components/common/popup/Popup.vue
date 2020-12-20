<template>
    <div class="popup" :class="{ close }">
        <div class="content" :style="{ width }">
            <i class="el-icon-close" @click="closePopup"></i>
            <slot name="layer"></slot>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        width: {
            type: String,
            default: '400px',
        },
    },
    data() {
        return {
            close: false,
        };
    },
    methods: {
        closePopup() {
            this.close = true;
            setTimeout(() => {
                this.$emit('close');
            }, 400);
        },
    },
});
</script>

<style lang="scss" scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(15, 19, 26, 0.8);
    z-index: 999;
    &.close {
        .content {
            animation: hide 0.4s cubic-bezier(0.51, -0.02, 0.49, 1.08) normal;
        }
    }
    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        max-height: 90%;
        transform: translate3d(-50%, -50%, 0);
        overflow-y: auto;
        background-color: #ebf0f2;
        padding: 64px 32px 24px;
        border-radius: 4px;
        box-shadow: 0 2px 5px 0 rgba(15, 39, 51, 0.07);
        animation: show 0.5s cubic-bezier(0.51, -0.02, 0.49, 1.08) normal;
        i {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 32px;
            height: 32px;
            line-height: 32px;
            background-color: rgba(0, 0, 0, 0.05);
            text-align: center;
            border-radius: 50%;
            cursor: pointer;
            transition: 0.4s;
            &:hover {
                opacity: 0.7;
            }
        }
    }
}
@keyframes show {
    0% {
        opacity: 0;
        top: -50%;
    }
    60% {
        top: 50%;
    }
    75% {
        top: 48%;
    }
    80% {
        top: 48%;
    }
    100% {
        top: 50%;
        opacity: 1;
    }
}
@keyframes hide {
    0% {
        opacity: 1;
        top: 50%;
    }

    100% {
        opacity: 0;
        top: -50%;
    }
}
</style>
