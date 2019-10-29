// vue.config.js
const entry = 'e_tailors_festival';
// const apiUrl = 'http://api-test.yeedev.com';
const apiUrl = 'http://api-dev.yeedev.com';
module.exports = {
    publicPath: '/',
    // outputDir: '',
    lintOnSave: true,
    productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    pages:{
        // givemefive: {
        //     entry: 'src/pages/givemefive/main.js',
        //     template: 'src/pages/givemefive/givemefive.html'
        // },
        e_tailors_festival: {
            entry: 'src/pages/e-tailors-festival/main.js',
            template: 'src/pages/e-tailors-festival/e-tailors-festival.html'
        },
        // betaactivity: {
        //     entry: 'src/pages/betaactivity/main.js',
        //     template: 'src/pages/betaactivity/betaactivity.html'
        // },
        // googleexchange: {
        //     entry: 'src/pages/googleexchange/main.js',
        //     template: 'src/pages/googleexchange/googleexchange.html'
        // },
        // googleexchange_pc: {
        //     entry: 'src/pages/googleexchange_pc/main.js',
        //     template: 'src/pages/googleexchange_pc/googleexchange_pc.html'
        // },
        // registration: {
        //     entry: 'src/pages/registration/main.js',
        //     template: 'src/pages/registration/registration.html'
        // },
        // registration_state: {
        //     entry: 'src/pages/registration_state/main.js',
        //     template: 'src/pages/registration_state/registration_state.html'
        // }
    },
    chainWebpack: config => {
        config.optimization.delete('splitChunks')
    },
    devServer:{
        // host: 'localhost.yeelight.com',
        host: '',
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