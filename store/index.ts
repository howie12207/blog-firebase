import { db, auth } from '@/plugins/firebase.ts';
const dataSite = 'blog';

export const state = () => ({
    login: false,
});
export const mutations = {
    LOGIN(state: { login: boolean }, payload: boolean) {
        state.login = payload;
    },
};

export const actions = {
    async login(store: any, params: { mail: string; password: string }) {
        try {
            await auth.signInWithEmailAndPassword(params.mail, params.password);
            store.commit('LOGIN', true);
        } catch (e) {
            return Promise.reject(e);
        }
    },
    async getArticles() {
        try {
            const articles = [] as any;
            const res = await db.collection(dataSite).get();
            res.forEach((doc: any) => {
                const appData = doc.data();
                const title = appData.title as any;
                articles.push({
                    id: doc.id,
                    title,
                    content: appData.content,
                    createTime: appData.createTime,
                    updateTime: appData.updateTime,
                });
            });
            return articles.sort(
                (a: any, b: any) => b.createTime - a.createTime
            );
        } catch (e) {
            return Promise.reject(e);
        }
    },
    createArticle(
        _: any,
        {
            title,
            content,
            createTime,
            updateTime,
        }: {
            title: string;
            content: string;
            createTime: number;
            updateTime: number;
        }
    ) {
        try {
            db.collection(dataSite).add({
                title,
                content,
                createTime,
                updateTime,
            });
        } catch (e) {
            return Promise.reject(e);
        }
    },
    async getArticle(_: any, params: number) {
        try {
            const res = await db.doc(`${dataSite}/${params}`).get();
            return { ...res.data(), id: res.id };
        } catch (e) {
            return Promise.reject(e);
        }
    },
    updateArticle(_: any, params: any) {
        try {
            const param = { ...params };
            delete param.id;
            db.doc(`${dataSite}/${params.id}`).set(param);
        } catch (e) {
            return Promise.reject(e);
        }
    },
    deleteArticle(_: any, params: string) {
        try {
            db.doc(`${dataSite}/${params}`).delete();
        } catch (e) {
            return Promise.reject(e);
        }
    },
    checkLogin(store: any) {
        try {
            auth.onAuthStateChanged((user: any) => {
                if (user) {
                    store.commit('LOGIN', true);
                } else {
                    store.commit('LOGIN', false);
                }
            });
        } catch (e) {
            return Promise.reject(e);
        }
    },
};
