<template>
    <div class="container">
        <ManageSortPage
            :sorts="sorts"
            @addSort="addSort"
            @updateSort="updateSort"
            @deleteSort="deleteSort"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ManageSort',
    layout: 'backstage',
    meta: {
        layout: 'backstage',
    },
    data() {
        return {
            sorts: [],
        };
    },
    created() {
        if (process.client) {
            this.getSorts();
        }
    },
    methods: {
        async addSort(params: object) {
            try {
                await this.$store.dispatch('createSort', params);
                await this.getSorts();
            } catch (e) {}
        },
        async getSorts() {
            try {
                const res = await this.$store.dispatch('getSorts');
                this.sorts = res;
            } catch (e) {}
        },
        async updateSort(params: object) {
            try {
                await this.$store.dispatch('updateSort', params);
                await this.getSorts();
            } catch (e) {}
        },
        async deleteSort(id: string) {
            try {
                await this.$store.dispatch('deleteSort', id);
                await this.getSorts();
            } catch (e) {}
        },
    },
});
</script>
