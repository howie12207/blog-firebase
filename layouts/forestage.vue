<template>
    <div class="fore_stage">
        <ForestageHeader @login="login" @register="register" />
        <div class="row">
            <Nuxt class="forestage_bottom" />
            <ForestageRightBar />
        </div>
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
.row {
    display: flex;
    padding-top: $num * 7;
    margin: auto;
    max-width: 1400px;
}
.forestage_bottom {
}
</style>
