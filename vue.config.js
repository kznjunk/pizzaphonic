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
        proxy: 'http://pizzaphonic.com/',
        public: 'http://pizzaphonic.com/',
        disableHostCheck: true
    }
}
