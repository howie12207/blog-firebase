<template>
    <div class="home">
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

<style lang="scss" scoped>
.home {
    min-height: 100vh;
    width: 400px;
    margin: auto;
}
</style>
