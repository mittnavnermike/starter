var gulp = require('gulp'),
	util = require('gulp-util'),
	notify = require('gulp-notify'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	jade = require('gulp-jade'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create();

var paths = {
	src : {
		sass: './src/scss/main.scss',
		jade: './src/jade/*.jade',
		jadeWatch: './src/jade/**/*.jade',
		js: './src/js/main.js',
		img: './src/images/'
	},
	dist : {
		root: './dist/',
		css: './dist/css/',
		markupWatch: './src/*.html',
		img: './dist/images',
		js: './dist/js/'
	}
}

gulp.task('styles', function(){
	return gulp.src(paths.src.sass)
	.pipe(sourcemaps.init())
	.pipe(sass().on("error", notify.onError(function (error) {
	  return "Error: " + error.message;
	})))
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.dist.css))
});

gulp.task('markup', function() {
  	var YOUR_LOCALS = {};
	return gulp.src(paths.src.jade)
	.pipe(jade({
		locals: YOUR_LOCALS,
		pretty: true
	}))
	.on("error", notify.onError(function (error) {
      return "Error: " + error.message;
    }))
	.pipe(gulp.dest(paths.dist.root))
});

gulp.task('javascripts', function() {
   gulp.src([paths.src.js])
	// .pipe(browserify())
 //  	.pipe(concat('main.js'))
  	.pipe(gulp.dest(paths.dist.js))
  // .pipe(uglify())
  // .pipe(rename('main.min.js'))
  // .pipe(gulp.dest(paths.dist.js))
});

gulp.task('watch', function() {
    gulp.watch(paths.src.jade ['markup']);
    gulp.watch(paths.src.jadeWatch).on('change', browserSync.reload);
    gulp.watch(paths.src.scss, ['sass']);
    gulp.watch(paths.src.js, [ 'javascripts' ]).on('change', browserSync.reload);
    gulp.watch(paths.src.images, ['images']);
    gulp.watch(paths.dist.markupWatch).on('change', browserSync.reload);
})

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: paths.dist.root
        }
    });
});

gulp.task('default', ['markup', 'styles', 'javascripts', 'serve', 'watch']);
