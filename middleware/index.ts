export default function ({ store, route, redirect }: any) {
    route.meta.forEach(async (meta: { layout: string }) => {
        if (meta?.layout === 'backstage') {
            if (store.state.login) return;
            await store.dispatch('checkLogin');
            if (!store.state.login) redirect('/');
        }
    });
}
