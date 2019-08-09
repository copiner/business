'use strict'
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var gulpSequence = require('gulp-sequence');
var runSequence = require('run-sequence');
var del = require('del');
var rev = require('gulp-rev-append');
//var webserver = require('gulp-webserver');

//反向代理
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');


gulp.task('static', function () {
    return gulp.src('src/lib/*')
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('css-min', function () {
    return gulp.src('src/css/*.css')
        // .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js-min', function () {
    return gulp.src('src/js/*.js')
        // .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('Html-min', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src('src/*.html')
        .pipe(rev())//(?:href|src)="(.*)[\?]rev=(.*)[\"]   //版本号
        // .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});

gulp.task('image-min', function () {
    return gulp.src('src/img/*.{png,jpg,gif,ico}')
        // .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});


gulp.task('webserver', function() {
    connect.server({
        root: ['src'],
        host:'localhost',
        port: 3000,
        livereload: true,
        middleware: function(connect, opt) {
            return [
                proxy('/api',  {
                    target: 'http://192.168.1.194:8080/sstsvr',
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
});

// gulp.task('webserver', function(){
//   gulp.src('src').pipe(webserver({
//     livereload: true,//实时刷新代码
//     open: true,
//     host: "localhost",
//     port: "8080"
//   }))
// });


gulp.task('clean', () => {
  return del('./dist').then(paths => {
    console.log(`
        -----------------------------
          clean tasks are successful
        -----------------------------`);
  });
});

gulp.task('watch', function () {//监控
  gulp.watch('./src/**/*',function(){
    console.log(`
        -----------------------------
          server reload are successful
        -----------------------------`);
  });
});


//生成环境
gulp.task('build', function() {
  gulpSequence('clean',['static', 'css-min','js-min','image-min'],'Html-min',function(){
                console.log(`
                    -----------------------------
                      build tasks are successful
                    -----------------------------`);
              });
});

//开发
gulp.task('server',function(){
  gulpSequence('webserver','watch', function(){
    console.log(`
        -----------------------------
          server tasks are successful
        -----------------------------`);
  });
});


// gulp.task('server',['watch'],function(){
//   console.log(`
//       -----------------------------
//         server tasks are successful
//       -----------------------------`);
// });

gulp.task('default', () => {
  console.log(
   `
  Build Setup
    开发环境： npm run start
    生产环境： npm run build
    `
  )
})
