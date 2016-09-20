var gulp =require('gulp'),
    cssmin = require('gulp-minify-css'),
    cssver = require('gulp-make-css-url-version'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    htmlreplace = require('gulp-html-replace'),
    rev = require('gulp-rev-append');
var browserSync = require('browser-sync').create();

/*�ϲ�/ѹ��CSS*/

gulp.task('testmin',function() {
    gulp.src('src/css/*.css')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(cssver())
        .pipe(concat('concat.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});

/*�ϲ�/ѹ��JS*/

gulp.task('testminjs',function() {
    gulp.src(['src/js/jquery-3.1.0.js','src/js/test1.js','src/js/test2.js'])
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(concat('concat.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

/*�����Զ�ִ��*/

gulp.task('watch',function(){
    gulp.watch('src/css/*.css',['testmin']);
    gulp.watch('src/js/*.js',['testminjs']);
    gulp.watch('index.html',['buildHtml']);
    gulp.watch('src/img/*.*',['buildPic']);
});

/*������Զ�ͬ��*/

gulp.task('bsync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("src/**/*.css").on('change', browserSync.reload);
    gulp.watch("src/**/*.js").on('change', browserSync.reload);
});

/*�滻htmlҳ���е�CSS/JS·��*/

gulp.task('buildHtml',function() {
    gulp.src('index.html')
        .pipe(htmlreplace({
            'css':'css/concat.css?rev=@@hash',
            'js':'js/concat.js?rev=@@hash'
        }))
        .pipe(rev())
        .pipe(gulp.dest('dist/'));

    gulp.src('dist/index.html')
        .pipe(rev())
        .pipe(gulp.dest('dist/'));
});

/*��ҳ�������ļ���Ӱ汾��*/

gulp.task('addRev',function () {
    gulp.src('index.html')
        .pipe(rev())
        .pipe(gulp.dest('dist/'));
});

/*ͼƬ�ƶ�*/

gulp.task('buildPic',function() {
    gulp.src('src/img/*.*')
         .pipe(gulp.dest('dist/img'));
});
