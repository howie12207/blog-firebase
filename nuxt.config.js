const routerBase =
    process.env.DEPLOY_ENV === 'GH_PAGES'
        ? {
              mode: 'hash',
              base: '/blog/',
              middleware: ['index'],
          }
        : {};

export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: "Howie's blog",
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['element-ui/lib/theme-chalk/index.css'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '@/plugins/element-ui.ts',
        { src: '@/plugins/quill-editor.ts', ssr: false },
        '@/plugins/timeFormat.ts',
        { src: '@/plugins/firebase.ts', ssr: false },
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        '@nuxtjs/tailwindcss',
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: ['@nuxtjs/style-resources'],

    styleResources: {},

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        transpile: [/^element-ui/],
    },
    router: {
        scrollBehavior() {
            return { x: 0, y: 0 };
        },
        ...routerBase,
    },
};
