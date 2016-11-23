var gulp = require('gulp');
    sass = require('gulp-sass');
    sync = require('browser-sync').create();
    postcss = require('gulp-postcss');
    autoprefixer = require('autoprefixer');
    mincss = require('gulp-minify-css');
    concat = require('gulp-concat');
    rename = require('gulp-rename');
    uglify = require('gulp-uglify');
    handlebars = require('gulp-compile-handlebars');

var processors = [
autoprefixer
];

gulp.task('scripts', function() {
    var scriptsrc = [
        'node_modules/jquery/dist/jquery.js',
        'app/js/*.js'
    ]

    return gulp.src(scriptsrc)
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(sync.stream());
});

gulp.task('scss', function() {
    return gulp.src('app/scss/style.scss')
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(mincss())
    .pipe(gulp.dest('dist/css'))
    .pipe(sync.stream());
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(sync.stream());
});

gulp.task('img', function() {
    return gulp.src('app/img/**')
    .pipe(gulp.dest('dist/img'))
    .pipe(sync.stream());
});

gulp.task('hbs', function () {
    var options = {
        batch : ['./app/views/partials']
    }
    return gulp.src('app/views/*.hbs')
        .pipe(handlebars({}, options))
        .pipe(rename({extname: '.html'}))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
});

gulp.task('sync', ['scripts', 'scss', 'hbs', 'fonts', 'img'], function(){
	sync.init({
		server:'./dist'
	})
	gulp.watch("app/scss/**/*.scss", ['scss']);
    gulp.watch("app/js/*.js", ['scripts']);
    gulp.watch("app/views/**/*.hbs", ['hbs']);
    gulp.watch("app/img/**", ['img']);
});

gulp.task('default', ['sync'], function() {
});
