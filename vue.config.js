module.exports = {
    devServer: {
        proxy: {
            '/order': {
                target: 'http://192.168.0.225:9000',
                changeOrigin: true,
                pathRewrite: {
                }
            }
        }
    }
}