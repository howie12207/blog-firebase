<template>
    <div class="fore_stage">
        <ForestageHeader @login="login" @register="register" />
        <div class="flex m-auto max-w-7xl pt-14">
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
