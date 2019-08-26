/* Written by wdaonngg@gmail.com in 2019-08-09*/

const { src, dest, task, series, parallel, watch, lastRun } = require('gulp');

const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');

const connect = require('gulp-connect');
const proxy = require('http-proxy-middleware');//反向代理

const fileinclude = require('gulp-file-include');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
// const rev = require('gulp-rev-append');//(?:href|src)="(.*)[\?]rev=(.*)[\"]   //版本号
const del = require('del');

// NODE_ENV
var env = process.env.NODE_ENV || 'development';
var condition = env === 'production';


task('lib', function (cb) {
  src('src/lib/*')
  .pipe(dest('app/lib'));
  cb();
})

task('css_min', function (cb) {
    src('src/scss/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rev())
    .pipe(dest('app/css'))
    .pipe(rev.manifest())
    .pipe(dest('rev/css'))
    .pipe(connect.reload());
    cb();
});

task('js_min', function (cb) {
    src('src/js/*.js')
    .pipe(plumber())
    .pipe(gulpif(condition, uglify()))
    .pipe(rev())
    .pipe(dest('app/js'))
    .pipe(rev.manifest())
    .pipe(dest('rev/js'))
    .pipe(connect.reload());
    cb();
});

task('html_min', function (cb) {
    let options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    src(['rev/**/*.json','src/index.html'])
    .pipe(plumber())
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
    .pipe(revCollector({
      replaceReved:true
    }))
    //.pipe(htmlmin(options))
    .pipe(dest('app'))
    .pipe(connect.reload());
    cb();
});

task('image_min', function (cb) {
    src('src/imgs/*')
    .pipe(plumber())
    //.pipe(gulpif(condition, imagemin()))
    .pipe(dest('app/imgs'));
    cb();
});


task('watch', function(cb){//监控
  watch('./src/js/*.js',parallel('js_min'));
  watch('./src/scss/*.scss',parallel('css_min'));
  watch('./src/*.html',parallel('html_min'));
  cb();
});


task('clean', () => {
  return del(['./app']).then(() => {
    console.log(`
        -----------------------------
          clean tasks are successful
        -----------------------------`);
  }).catch((e) =>{
    console.log(e);
  })
});


//生成环境
task('build', series('clean', parallel('lib','css_min','js_min','image_min'),'html_min',function(cb){
  console.log(`
      -----------------------------
        build tasks are successful
      -----------------------------`);
      cb();
}));

task('server',series('build','watch',function(){
    connect.server({
        root: 'app',
        host:'localhost',
        port: 3000,
        livereload: true
        // middleware: function(connect, opt) {
        //     return [
        //         proxy('/api',  {
        //             target: 'http://192.168.1.194:8080/sstsvr',
        //             changeOrigin:true,
        //             headers: {
        //                  "Connection": "keep-alive"
        //              },
        //             //ws: true,
        //             pathRewrite: {
        //                 '^/api' : ''
        //             },
        //             router: {
        //               // 'integration.localhost:3000' : 'http://localhost:8001',  // host only
        //               // 'staging.localhost:3000'     : 'http://localhost:8002',  // host only
        //               // 'localhost:3000/api'         : 'http://localhost:8003',  // host + path
        //               // '/rest'                      : 'http://localhost:8004'   // path only
        //             }
        //         })
        //     ]
        // }

    });
    console.log(`
        -----------------------------
          server tasks are successful
        -----------------------------`);
}));

task('default', () => {
  console.log(
   `
  Build Setup
    开发环境： npm run start
    生产环境： npm run build
    `
  )
})
