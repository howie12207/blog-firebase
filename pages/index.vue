<template>
    <div class="container">
        <HomePage
            :articles="articles"
            :page-option="pageOption"
            @handleCurrentChange="handleCurrentChange"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Home',
    layout: 'forestage',
    data() {
        return {
            totalArticles: [] as any,
            pageOption: {
                page: 1,
                size: 10,
                total: 0,
            },
        };
    },
    computed: {
        articles(): any {
            const start = (this.pageOption.page - 1) * this.pageOption.size;
            const end = this.pageOption.page * this.pageOption.size;
            return this.totalArticles.slice(start, end);
        },
    },
    watch: {
        $route() {
            this.setCurrentPage();
        },
    },
    created() {
        if (process.client) {
            this.setCurrentPage();
            this.getArticles();
        }
    },
    methods: {
        async getArticles() {
            try {
                const res = await this.$store.dispatch('getArticles');
                this.pageOption.total = res.length;
                this.totalArticles = res;
            } catch (e) {}
        },
        handleCurrentChange(page: number) {
            this.pageOption.page = page;
            if (page === 1) {
                this.$router.push({ query: {} as any });
            } else {
                this.$router.push({ query: { page } as any });
            }
        },
        setCurrentPage() {
            this.pageOption.page = this.$route.query?.page
                ? Number(this.$route.query.page)
                : 1;
        },
    },
});
</script>
