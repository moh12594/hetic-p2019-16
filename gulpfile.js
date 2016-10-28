var gulp = require('gulp'),
sass = require('gulp-sass');
sync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var processors = [
autoprefixer
];

gulp.task('jquery', function () {
    return gulp.src('./node_modules/jquery/src')
        .pipe(jquery({
            flags: ['-deprecated', '-event/alias', '-ajax/script', '-ajax/jsonp', '-exports/global']
        }))
        .pipe(gulp.dest('./public/vendor/'));
    // creates ./public/vendor/jquery.custom.js 
});
gulp.task('scss', function() {
return gulp.src('app/scss/style.scss')
.pipe(sass())
.pipe(postcss(processors))
.pipe(gulp.dest('dist/css'))
.pipe(sync.stream());
});

gulp.task('sync', ['scss'], function(){
		sync.init({
			server:'./'
		})
		gulp.watch("app/scss/*.scss", ['scss']);

});