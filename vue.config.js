// vue.config.js
const entry = 'googleexchange';
// const apiUrl = 'http://api-test.yeedev.com';
const apiUrl = 'http://api-dev.yeedev.com';
module.exports = {
    publicPath: '/apis/c/webjars',
    outputDir: 'target/classes/META-INF/resources/webjars/',
    lintOnSave: true,
    productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    pages:{
        givemefive: {
            entry: 'src/pages/givemefive/main.js',
            template: 'src/pages/givemefive/givemefive.html',
            chunks: ['givemefive']
        },
        betaactivity: {
            entry: 'src/pages/betaactivity/main.js',
            template: 'src/pages/betaactivity/betaactivity.html',
            chunks: ['betaactivity']
        },
        googleexchange: {
            entry: 'src/pages/googleexchange/main.js',
            template: 'src/pages/googleexchange/googleexchange.html',
            chunks: ['googleexchange']
        },
        googleexchange_m: {
            entry: 'src/pages/googleexchange_m/main.js',
            template: 'src/pages/googleexchange_m/googleexchange_m.html',
            chunks: ['googleexchange_m']
        }
    },
    devServer:{
        host: 'localhost.yeelight.com',
        port: 80,
        open: true,
        openPage: `${entry}.html`,
        proxy: {
            '/apis/c': {
                target: apiUrl,
                ws: true,
                // pathRewrite: {
                //     '^/apis/c': '/'
                // },
            }
        }
    }
}