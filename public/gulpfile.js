const gulp = require('gulp');
const gutil = require('gulp-util')
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const connect = require('gulp-connect');
const babel = require('gulp-babel');
const order = require("gulp-order");

gulp.task('js', function(){
	return gulp.src('js/*.js')
	.pipe(order([
		"js/util.js",
		"js/data.js",
		"js/Loader.js",
		"js/Globe.js",
		"js/glowMesh.js",
		"js/Avatar.js",
		"js/API.js",
		"js/WorldController.js",
		"js/ui.js",
		"js/main.js",
	]))
	.pipe(babel({
      presets: ['es2015']
    }))
	.pipe(concat('app.js'))
	// .pipe(uglify())
	.on('error', function (err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('js/dist'));
});

gulp.task('lib', function(){
	return gulp.src([
		"js/lib/three.js",
		"js/lib/OrbitControls.js",
		"js/lib/CopyShader.js",
		"js/lib/EffectComposer.js",
		"js/lib/RenderPass.js",
		"js/lib/ShaderPass.js",
		"js/lib/SubdivisionModifier.js",
		"js/lib/GeometryUtils.js",
		"js/lib/Tween.js",
	])
	.pipe(concat('lib.js'))
	.pipe(uglify())
	.pipe(gulp.dest('js/dist'));
});

gulp.task('css', function(){
	return gulp.src(
		'scss/style.scss'
	)
	.pipe(sass().on('error', sass.logError))
	.pipe(rename('style.css'))
	.pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
	gulp.watch('js/lib/**', ['lib']);
    gulp.watch('js/**', ['js']);
    gulp.watch('scss/**', ['css']);
});

gulp.task('watch-css', function(){
	gulp.watch('scss/**', ['css']);
});

gulp.task('webserver', function() {
  connect.server({
    livereload: false
  });
});

gulp.task('dev', ['css', 'lib', 'js', 'watch'])
