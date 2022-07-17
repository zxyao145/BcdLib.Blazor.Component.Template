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
                    test: /\.(woff(2)?|ttf|eot)?(\?v=[0-9]\.[0-9]\.[0-9])*$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: `./${outputFontsDir}/`,//相对于output的path
                                publicPath: `/dist/${outputFontsDir}/` //相对于网站根目录的路径
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])*$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: `./${outputImgDir}/`,
                                publicPath: `/dist/${outputImgDir}/`
                            }
                        }
                    ]
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
            //splitChunks: {
            //    //chunks: 'all',//将其他node_modules下打包为一个文件
            //    cacheGroups: {
            //        //vendors: {
            //        //    test: /[\\/]node_modules[\\/][.]*jquery/,
            //        //    priority: -10,
            //        //    name: 'vendor'
            //        //},
            //        commonModule: {
            //            test: /[\\/]node_modules[\\/]/,
            //            name: 'js/commonModule',
            //            chunks: 'all',
            //            priority: -10,
            //            minChunks: 2
            //        },
            //        commons: {
            //            test: /src\/ts/,
            //            name: 'js/commons',
            //            chunks: 'initial',
            //            minChunks: 8
            //        }
            //    }
            //},
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