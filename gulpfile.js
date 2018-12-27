var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

browserSync.init({
	server: "dist"
});

function defaultTask(cb) {

	// place code for your default task here
	// Watch .js files
	gulp.watch('src/assets/js/*.js', function () {
		console.log("cleaning js...");
		return gulp.src('src/assets/js/*.js')
			.pipe(concat('bundle.min.js'))
			.pipe(uglify())
			.pipe(gulp.dest('dist/assets/js'))
			.pipe(browserSync.stream());
	});
	// Watch .scss files
	gulp.watch('src/assets/scss/*.scss', function () {
		console.log("compiling scss...");
		return gulp.src('src/assets/scss/*.scss')
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(concat('bundle.min.css'))
			.pipe(minifyCSS())
			.pipe(gulp.dest('dist/assets/css'))
			.pipe(browserSync.stream());
	});

	gulp.watch('src/**/*.html', function () {
		console.log("cleaning pages...");
		return gulp.src(['src/**/*.html'])
			.pipe(htmlmin({
				collapseWhitespace: true,
				removeComments: true
			}))
			.pipe(gulp.dest('dist'))
			.pipe(browserSync.stream());
	});
	// // Watch image files
	// gulp.watch('src/images/**/*', ['images']);
	cb();
}

gulp.task('bootstrap-js', function () {
	return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/popper.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js'])
		// .pipe(uglify())
		.pipe(gulp.dest("dist/assets/js"))
});

gulp.task('bootstrap-css', function () {
	gulp.watch('node_modules/bootstrap/scss/*.scss', function () {
		return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss'])
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCSS())
		.pipe(gulp.dest("dist/assets/css"))
	})
});

exports.default = defaultTask