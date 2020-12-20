<template>
    <nav class="left_bar">
        <nuxt-link
            v-for="item in menu"
            :key="item.route"
            :to="item.route"
            class="nav_item"
        >
            {{ item.label }}
        </nuxt-link>
    </nav>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'BackstageLeftBar',
    data() {
        return {
            menu: [
                { label: '新增文章', route: '/backstage/addArticle' },
                { label: '管理文章', route: '/backstage/manageArticle' },
            ],
        };
    },
    methods: {},
});
</script>

<style lang="scss" scoped>
.left_bar {
    width: 250px;
    min-height: 100vh;
    background-color: #ccc;
    .nav_item {
        display: block;
        cursor: pointer;
    }
}
</style>
