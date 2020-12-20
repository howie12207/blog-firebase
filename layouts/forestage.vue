<template>
    <div class="fore_stage">
        <ForestageHeader @login="login" @register="register" />
        <Nuxt class="forestage_bottom" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    methods: {
        async login(params: object) {
            try {
                await this.$store.dispatch('login', params);
                this.$router.push('/backstage');
            } catch (err) {
                this.$message.error(err.message);
            }
        },
        register() {},
    },
});
</script>

<style lang="scss" scoped>
.forestage_bottom {
    padding-top: $num * 7;
}
</style>
