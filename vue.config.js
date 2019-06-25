// vue.config.js
const entry = 'googleexchange';
// const apiUrl = 'http://api-test.yeedev.com';
const apiUrl = 'http://api-dev.yeedev.com';
module.exports = {
    publicPath: '',
    outputDir: 'target/classes/META-INF/resources/webjars/',
    lintOnSave: true,
    pages:{
        // givemefive: {
        //     entry: 'src/pages/givemefive/main.js',
        //     template: 'src/pages/givemefive/givemefive.html'
        // },
        betaactivity: {
            entry: 'src/pages/betaactivity/main.js',
            template: 'src/pages/betaactivity/betaactivity.html'
        },
        googleexchange: {
            entry: 'src/pages/googleexchange/main.js',
            template: 'src/pages/googleexchange/googleexchange.html'
        },
        // googleexchange_m: {
        //     entry: 'src/pages/googleexchange_m/main.js',
        //     template: 'src/pages/googleexchange_m/googleexchange.html'
        // }
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