<template>
    <div class="row">
        <BackstageLeftBar />
        <Nuxt />
    </div>
</template>

<style lang="scss" scoped>
.row {
    display: flex;
    .container {
        width: calc(100% - 250px);
    }
}
</style>
