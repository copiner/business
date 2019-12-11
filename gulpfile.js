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
// const rev = require('gulp-rev-append');//(?:href|src)="(.*)[\?]rev=(.*)[\"]   //版本号 该方法舍弃
const del = require('del');

// NODE_ENV
var env = process.env.NODE_ENV || 'development';
var condition = env === 'production';

task('css_dev', function (cb) {
    src('src/scss/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css'))
    .pipe(connect.reload());
    cb();
});

task('html_dev', function (cb) {
    src('src/*.html')
    .pipe(plumber())
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
    .pipe(dest('dist'))
    .pipe(connect.reload());
    cb();
});

task('js_dev', function (cb) {
    src('src/js/*.js')
    .pipe(plumber())
    .pipe(dest('dist/js'))
    .pipe(connect.reload());
    cb();
});

task('css_pro', function (cb) {
    src('src/scss/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rev())
    .pipe(dest('dist/css'))
    .pipe(rev.manifest())
    .pipe(dest('rev/css'));
    cb();
});

task('js_pro', function (cb) {
    src('src/js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rev())
    .pipe(dest('dist/js'))
    .pipe(rev.manifest())
    .pipe(dest('rev/js'));
    cb();
});

task('html_pro', function (cb) {
    let options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    src(['./rev/**/*.json','./src/*.html'])
    .pipe(plumber())
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
    .pipe(revCollector({
      collectedManifest:'test-mainfest.json',
      replaceReved:true
    }))
    // .pipe(htmlmin(options))
    .pipe(dest('dist'))
    .pipe(connect.reload());
    cb();
});

task('lib', function (cb) {
  src('src/lib/*')
  .pipe(dest('dist/lib'));
  cb();
})

task('config', function (cb) {
  src('src/config/*')
  .pipe(dest('dist/config'));
  cb();
})

task('image_min', function (cb) {
    src('src/imgs/*')
    .pipe(plumber())
    // .pipe(gulpif(condition, imagemin()))
    .pipe(dest('dist/imgs'));
    cb();
});


task('watch', function(cb){//监控

  let watcher = watch(
    ['./src/js/*.js','./src/scss/*.scss','./src/*.html'],
    {events:['change','add','unlink']},
    parallel('css_dev','js_dev','html_dev')
  );

  watcher.on('change', function(path, stats) {
    console.log(`
      ------------------------
      File ${path} was changed
      ------------------------
      `);
  });

  watcher.on('add', function(path, stats) {
    console.log(`
      ----------------------
      File ${path} was added
      ----------------------
      `);
  });

  watcher.on('unlink', function(path, stats) {
    console.log(`
      ------------------------
      File ${path} was removed
      ------------------------
      `);
  });

  //watcher.close();
  cb();
});


task('clean', () => {
  return del('./dist').then(() => {
    console.log(`
        -----------------------------
          clean tasks are successful
        -----------------------------`);
  }).catch((e) =>{
    console.log(e);
  })
});


//生成环境
task('build', series('clean', parallel('config','lib','css_pro','js_pro','image_min'),'html_pro',function(cb){
  console.log(`
      -----------------------------
        build tasks are successful
      -----------------------------`);
      cb();
}));

//开发环境
task('server',series('clean','watch',parallel('config','lib','css_dev','js_dev','image_min','html_dev'),function(){
    connect.server({
        root: 'dist',
        host:'192.168.1.77',
        port: 3000,
        livereload: true,
        middleware: function(connect, opt) {
            return [
                proxy('/api',  {
                    target: 'http://192.168.23.142:8089/gateway',
                    changeOrigin:true,
                    headers: {
                         "Connection": "keep-alive"
                     },
                    //ws: true,
                    pathRewrite: {
                        '^/api' : ''
                    },
                    router: {
                      // 'integration.localhost:3000' : 'http://localhost:8001',  // host only
                      // 'staging.localhost:3000'     : 'http://localhost:8002',  // host only
                      // 'localhost:3000/api'         : 'http://localhost:8003',  // host + path
                      // '/rest'                      : 'http://localhost:8004'   // path only
                    }
                })
            ]
        }

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
