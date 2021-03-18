/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    devServer: {
        proxy: 'http://localhost:' + process.env.VUE_APP_BE_PORT
    },
}