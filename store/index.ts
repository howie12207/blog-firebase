import { db, auth } from '@/plugins/firebase.ts';
const dataSite = 'blog';

interface paramsType {
    mail: string;
    password: string;
    title: string;
    content: string;
    createTime: number;
    updateTime: number;
    id: string;
}

export const state = () => ({
    login: false,
});
export const mutations = {
    LOGIN(state: { login: boolean }, payload: boolean) {
        state.login = payload;
    },
};

export const actions = {
    async login(store: any, params: paramsType) {
        try {
            await auth()
                .setPersistence(auth.Auth.Persistence.NONE)
                .then(() =>
                    auth().signInWithEmailAndPassword(
                        params.mail,
                        params.password
                    )
                );
            store.commit('LOGIN', true);
        } catch (e) {
            return Promise.reject(e);
        }
    },
    async logout() {
        try {
            await auth().signOut();
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
    async createArticle(
        _: any,
        { title, content, createTime, updateTime }: paramsType
    ) {
        try {
            await db.collection(dataSite).add({
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
    async updateArticle(_: any, params: paramsType) {
        try {
            const param: any = { ...params };
            delete param.id;
            await db.doc(`${dataSite}/${params.id}`).set(param);
        } catch (e) {
            return Promise.reject(e);
        }
    },
    async deleteArticle(_: any, params: string) {
        try {
            await db.doc(`${dataSite}/${params}`).delete();
        } catch (e) {
            return Promise.reject(e);
        }
    },
    checkLogin(store: any) {
        try {
            auth().onAuthStateChanged((user: any) => {
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
