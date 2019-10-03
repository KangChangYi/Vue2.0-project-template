/* eslint-disable no-param-reassign */
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, './', dir);
}

const productionGzipExtensions = ['js', 'css'];

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? process.env.VUE_BASE_PATH
        : '/',
    outputDir: process.env.VUE_BASE_OUT_DIR, // 构建项目后输出的目录
    assetsDir: 'static', // 静态资源目录
    lintOnSave: process.env.NODE_ENV !== 'production', // 仅dev环境开启
    configureWebpack: () => {
        const myConfig = [];
        if (process.env.NODE_ENV === 'production') { // 生产及测试环境
            myConfig.plugins.push(
                // prod 环境开启gzip压缩，此外还需服务器配置
                new CompressionPlugin({
                    test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
                    threshold: 8192,
                    minRatio: 0.8,
                }),
            );
        }
        return myConfig;
    },
    chainWebpack: (config) => {
        // svg loader
        const svgRule = config.module.rule('svg'); // 找到 svg-loader
        svgRule.uses.clear(); // 清除已有的 loader, 如果不这样做会添加在此 loader 之后
        svgRule.exclude.add(/node_modules/); // 正则匹配排除 node_modules 目录
        svgRule // 添加 svg 新的 loader 处理
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            });
        // 修改 images loader 添加 svg 处理
        const imagesRule = config.module.rule('images');
        imagesRule.exclude.add(resolve('src/icons'));
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
    },
    css: {
        modules: false,
        extract: false, // 提取 CSS 至一个文件，开发环境下开启将使 CSS 热重载无效
        sourceMap: false,
        loaderOptions: { // 向 CSS loader 传递选项
            sass: {
                data: `@import "@/styles/common.scss";@import "@/styles/variables.scss";`
            }
        },
    },
    devServer: {
        host: '0.0.0.0', // 设定 0,0,0,0 后，非本机可通过 ip 访问
        port: 7000, // 默认端口
        proxy: {
            '/api': {
                // TODO 开发环境真实的后端 api 地址
                target: 'http://localhost:8080',
                ws: false,
                changeOrigin: true, // 本地起一个虚拟服务器代理请求（跨域）
                secure: false,
                pathRewrite: {
                    [`^/api`]: ''
                }
            },
        },
    },
    // 第三方插件配置
    pluginOptions: { },
};
