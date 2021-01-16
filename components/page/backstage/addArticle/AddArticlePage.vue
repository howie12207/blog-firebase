<template>
    <div>
        <ModifyArticle v-on="$listeners" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'AddArticlePage',
});
</script>
