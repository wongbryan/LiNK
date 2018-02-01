const gulp = require('gulp');
const gutil = require('gulp-util')
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const connect = require('gulp-connect');
const babel = require('gulp-babel');

gulp.task('js', function(){
	return gulp.src([
		'src/js/data.js',
		'src/js/util.js',
		'src/js/main.js',
	])
	.pipe(babel({
      presets: ['es2015']
    }))
	.pipe(concat('app.js'))
	.pipe(uglify())
	.on('error', function (err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('dist'));
});

gulp.task('lib', function(){
	return gulp.src([
		'node_modules/three/build/three.js',
		'node_modules/three/examples/js/controls/OrbitControls.js',
	])
	.pipe(concat('lib.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});

gulp.task('css', function(){
	return gulp.src(
		'src/scss/style.scss'
	)
	.pipe(sass().on('error', sass.logError))
	.pipe(rename('style.css'))
	.pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
    gulp.watch('src/js/**', ['js']);
    gulp.watch('src/scss/**', ['css']);
});

gulp.task('webserver', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('dev', ['css', 'lib', 'js', 'webserver', 'watch'])
