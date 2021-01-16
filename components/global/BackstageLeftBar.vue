<template>
    <nav class="w-60 py-10 min-h-screen bg-gray-200">
        <nuxt-link
            v-for="item in menu"
            :key="item.route"
            :to="item.route"
            class="block text-red-700 p-2"
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
