<template>
    <div>
        <ModifyArticle @submit="submit" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'AddArticlePage',
    methods: {
        submit(params: object) {
            this.$emit('submit', params);
        },
    },
});
</script>

<style lang="scss" scoped></style>
