
const { src, dest, task, series, parallel, watch, lastRun } = require('gulp');

const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

const connect = require('gulp-connect');
//反向代理
const proxy = require('http-proxy-middleware');

const fileinclude = require('gulp-file-include');
const rev = require('gulp-rev-append');
const del = require('del');

task('css_min', function (cb) {
    src('src/css/*.css')
    .pipe(cleanCSS())
    .pipe(dest('app/css'))
    .pipe(connect.reload());
    cb();
});

task('js_min', function (cb) {
    src('src/js/*.js')
    .pipe(uglify())
    .pipe(dest('app/js'))
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
    src('src/*.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
    .pipe(rev())//(?:href|src)="(.*)[\?]rev=(.*)[\"]   //版本号
    //.pipe(htmlmin(options))
    .pipe(dest('app'))
    .pipe(connect.reload());
    cb();
});

task('image_min', function (cb) {
    src('src/img/*')
    //.pipe(imagemin())
    .pipe(dest('app/img'));
    cb();
});


task('watch', function(cb){//监控
  watch('./src/js/*.js',parallel('js_min'));
  watch('./src/css/*.css',parallel('css_min'));
  watch('./src/*.html',parallel('html_min'));
  cb();
});


task('clean', () => {
  return del('./app').then(() => {
    console.log(`
        -----------------------------
          clean tasks are successful
        -----------------------------`);
  }).catch((e) =>{
    console.log(e);
  })
});


//生成环境
task('build', series('clean', parallel('css_min','js_min','image_min','html_min'),function(cb){
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
