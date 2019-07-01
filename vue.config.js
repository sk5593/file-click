// vue.config.js
const entry = 'googleexchange';
const apiUrl = 'http://api-test.yeedev.com';
// const apiUrl = 'http://api-dev.yeedev.com';
module.exports = {
    publicPath: '/',
    // outputDir: '',
    lintOnSave: true,
    productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    pages:{
        givemefive: {
            entry: 'src/pages/givemefive/main.js',
            template: 'src/pages/givemefive/givemefive.html'
        },
        betaactivity: {
            entry: 'src/pages/betaactivity/main.js',
            template: 'src/pages/betaactivity/betaactivity.html'
        },
        googleexchange: {
            entry: 'src/pages/googleexchange/main.js',
            template: 'src/pages/googleexchange/googleexchange.html'
        },
        googleexchange_pc: {
            entry: 'src/pages/googleexchange_pc/main.js',
            template: 'src/pages/googleexchange_pc/googleexchange_pc.html'
        }
    },
    chainWebpack: config => {
        config.optimization.delete('splitChunks')
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