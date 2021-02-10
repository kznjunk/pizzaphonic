module.exports = {
    lintOnSave: false,
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                @import "@/scss/_variables.scss";
                `
            }
        }
    },
    devServer: {
        port: 92,
        proxy: 'http://localhost:3000',
        public: 'http://pizzaphonic.com/',
        disableHostCheck: true
    }
}
