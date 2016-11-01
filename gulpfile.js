var gulp = require('gulp'),
    sass = require('gulp-sass');
    sync = require('browser-sync').create();
    postcss = require('gulp-postcss');
    autoprefixer = require('autoprefixer');
    mincss = require('gulp-minify-css');
    concat = require('gulp-concat');
    rename = require('gulp-rename');
    uglify = require('gulp-uglify');

var processors = [
autoprefixer
];

gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(sync.stream());
});

gulp.task('vendors', function () {
    return gulp.src('app/lib/jquery.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/public/vendor/'));
});

gulp.task('scss', function() {
    return gulp.src('app/scss/style.scss')
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(mincss())
    .pipe(gulp.dest('dist/css'))
    .pipe(sync.stream());
});

gulp.task('sync', ['vendors', 'scripts', 'scss'], function(){
	sync.init({
		server:'./'
	})
	gulp.watch("app/scss/*.scss", ['scss']);
    gulp.watch("app/js/*.js", ['scripts']);
});

gulp.task('default', ['sync'], function() {
});
