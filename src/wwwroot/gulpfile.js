const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const gutil = require('gulp-util');

// ts
var gulpTs = require("gulp-typescript");
const uglify = require('gulp-uglify');

// scss
const sass = require('gulp-sass')(require('node-sass'));;

// config
const outDir = "./dist";
const sourcemapsDir = "../sourceMaps"

const tsSrc = './src/*.ts';

const scssSrc = './src/*.scss';


gulp.task('ts', function (done) {
    return ts(done);
});

gulp.task('scss', function () {
    return scss();
});

function isProd() {
    console.log("env", gutil.env.env);
    if (gutil.env.env && gutil.env.env === "prod") {
        return true;
    }
    return false;
}

function ts(done) {
    let pipeline = gulp.src(tsSrc)
        .pipe(
            sourcemaps.init({})
        )
        .pipe(gulpTs(
            {
                "outDir": "./dist/ts", //不输出ts编译结果
                "noEmit": false, //不输出ts编译结果
                "sourceMap": true,
                "noImplicitAny": true,
                "module": "es6",
                "target": "es6",
                "allowJs": true,
                "lib": [
                    "DOM",
                    "ES2015",
                    "ES2016",
                    "ES2017",
                    "ES2018",
                    "ES2019",
                    "ES2020"
                ],
            }
        ));

    pipeline = pipeline.pipe(uglify())
    if (!isProd()) {
        console.log("js out sourcemapsDir", sourcemapsDir);
        pipeline = pipeline.pipe(sourcemaps.write(sourcemapsDir));
    }
    pipeline
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(outDir))
        .pipe(notify("ts finished"));
    return pipeline;
}

function scss() {
    let pipeline = gulp.src(scssSrc)
        .pipe(
            sourcemaps.init({
                loadMaps: true,  //是否加载以前的 .map 
                largeFile: true   //是否以流的方式处理大文件
            })
        )
        .pipe(rename({ suffix: '.min' }))
        .pipe(//expanded
            sass({ outputStyle: "compressed" })
                .on('error', sass.logError)
        );
    if (!isProd()) {
        console.log("scss out sourcemapsDir", sourcemapsDir);
        pipeline = pipeline.pipe(sourcemaps.write(sourcemapsDir));
    }
    pipeline
        .pipe(gulp.dest(outDir))
        .pipe(notify("scss finished"));
    return pipeline;
}

function watchFile() {
    ts();
     watch(tsSrc, function () {
        ts();
    });

    scss();
    return watch(scssSrc, function () {
        scss();
    });
}

gulp.task('default', gulp.parallel('scss', 'ts'), function () { });
gulp.task('watch', function () {
    return watchFile();
});

//exports.default = defaultTask;
//exports.watch = watchFile;

// in development environment：gulp 
// in production environment：gulp --env=prod