// vue.config.js
const entry = 'betaactivity';
const apiUrl = 'http://api-test.yeedev.com';
module.exports = {
    publicPath: '',
    outputDir: 'target/classes/META-INF/resources/webjars',
    lintOnSave: true,
    pages:{
        // givemefive: {
        //     entry: 'src/pages/givemefive/main.js',
        //     template: 'src/pages/givemefive/givemefive.html'
        // },
        betaactivity: {
            entry: 'src/pages/betaactivity/main.js',
            template: 'src/pages/betaactivity/betaactivity.html'
        }
    },
    devServer:{
        host: 'localhost.yeelight.com',
        port: 80,
        open: true,
        openPage: `/${entry}.html`,
        proxy: {
            '/apis/c': {
                target: apiUrl,
                ws: true
            }
        }
    }
}