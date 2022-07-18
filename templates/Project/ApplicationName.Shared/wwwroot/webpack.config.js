const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');

// 文件提取插件，可分离css为单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const outputCssDir = ""; // css/ --> dist/css
const outputJsDir = ""; // js/ --> dist/js
const outputImgDir = "images"; // dist/images
const outputFontsDir = "fonts"; // dist/fonts

// TODO： entry
let entryJs = {
    "index": "./src/index.ts",
};


const configFunc = (env, options) => {

    let model = options.mode;

    let isProduction = model === 'production';
    if (isProduction) {
        rimraf.sync(`./dist/${outputCssDir}`);
        rimraf.sync(`./dist/${outputJsDir}`);
    }

    const config = {
        watch: false,
        entry: entryJs,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `${outputJsDir}[name].min.js`,
            path: path.resolve(__dirname, "dist")
        },

        //devtool: isProduction ? false : "source-map", //"inline-source-map",
        devtool: false,

        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },

        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',// 将 CSS 转化成 CommonJS 模块
                        'resolve-url-loader',//必须在'css-loader'后面 and 'sass-loader'前
                        'sass-loader'// 将 Sass 编译成 CSS，默认使用 Node Sass
                    ]
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(woff(2)?|ttf|eot|otf)?(\?v=[0-9]\.[0-9]\.[0-9])*$/,
                    type: 'asset/resource',
                    generator: {
                        filename: `./${outputFontsDir}/[name][ext]`
                    },
                },
                {
                    test: /\.(png|svg|jpg|gif|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])*$/,
                    type: 'asset/resource',
                    generator: {
                        filename: `./${outputImgDir}/[name][ext]`
                    },
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader"
                }
            ]
        },
        externals: {
            "jquery": 'jQuery'
        },
        optimization: {
            splitChunks: {
                //chunks: 'all',//将其他node_modules下打包为一个文件
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/][.]*/,
                        priority: -10,
                        name: 'vendor'
                    }
                }
            },
            //runtimeChunk: {
            //    name: 'runtime'
            //}
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `${outputCssDir}[name].min.css`
            }),
            new webpack.SourceMapDevToolPlugin({
                filename: '../sourceMaps/[name][ext].map',
                fileContext: "dist",
                sourceRoot: "../src"
            })
        ]
    };

    return config;
}


module.exports = configFunc;