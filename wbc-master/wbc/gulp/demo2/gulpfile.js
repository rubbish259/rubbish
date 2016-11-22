var gulp = require('gulp'),

	cssmin = require('gulp-minify-css'),
	cssver = require('gulp-make-css-url-version'),
	
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	
	rev = require('gulp-rev-append'),
	
	// runSequence = require('run-sequence'),
    
    htmlreplace = require('gulp-html-replace'),
	
	crypto = require('crypto');
	
////////////////////////////////////////////////////////

/**
	压缩，合并css
*/
gulp.task('cssMin', function() {
	gulp.src('src/**/*.css')
		.pipe(cssver())
		.pipe(concat('build.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'));
});

/**
	压缩js
*/
gulp.task('jsMin', function() {
	gulp.src('src/js/**/*.js')
		.pipe(concat('build.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

/**
	html页面内容替换
*/
gulp.task('rev', function() {
	var hash = crypto.createHash('md5');
	var version = hash.digest('hex');
	gulp.src('src/*.html')
        .pipe(htmlreplace({
            'wbcCss': 'css/build.css?rev=' + version,
            'wbcJs': 'js/build.js?rev=' + version
        }))
		.pipe(rev())
        .pipe(gulp.dest('dist/'));
		
	gulp.src('src/pages/*.html')
        .pipe(htmlreplace({
            'wbcCss': '../css/build.css?rev=' + version,
            'wbcJs': '../js/build.js?rev=' + version
        }))
		.pipe(rev())
        .pipe(gulp.dest('dist/pages/'));
});

/**
	非压缩文件复制
*/
gulp.task('copy', function() {
	gulp.src('src/lib/**/*')
		.pipe(gulp.dest('dist/lib'));
		
	gulp.src('src/img/**/*')
		.pipe(gulp.dest('dist/img'));
});

/**
	构建入口
*/
gulp.task('build', ['cssMin', 'jsMin', 'rev', 'copy'], function() {
	
});