var gulp = require('gulp'),
sass = require('gulp-sass');
sync = require('browser-sync').create();
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

var processors = [
autoprefixer
];

gulp.task('scss', function() {
return gulp.src('scss/style.scss')
.pipe(sass())
.pipe(postcss(processors))
.pipe(gulp.dest('css'))
.pipe(sync.stream());
});

gulp.task('sync', ['scss'], function(){
		sync.init({
			server:'./'
		})
		gulp.watch("scss/**/*.scss", ['scss']);

});