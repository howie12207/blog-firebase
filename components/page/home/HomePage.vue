<template>
    <div class="min-h-screen w-3/5 m-auto">
        <ArticleCard v-for="card in articles" :key="card.id" :article="card" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'HomePage',
    props: {
        articles: {
            type: Array,
            default: () => [],
        },
    },
});
</script>
