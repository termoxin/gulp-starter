const gulp 			= require('gulp')
const sass 			= require('gulp-sass')
const pug 			= require('gulp-pug')
const imagemin      = require('gulp-imagemin')
const autoprefixer  = require('gulp-autoprefixer')
const browserSync   = require('browser-sync')
const uglify 		= require('gulp-uglify');

// const concatCss = require('gulp-concat-css')

gulp.task('sass', () => {
	return gulp.src('src/sass/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false
    }))
	.pipe(gulp.dest('./build/css'))
})

gulp.task('pug', () => {
	return gulp.src('src/*.pug')
	.pipe(pug())
	.pipe(gulp.dest('./build'))
})

gulp.task('images', () => {
	return gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('build/img'))
})

gulp.task('js', () => {
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'))
})


gulp.task('watch', ['sass', 'js', 'images', 'pug'], (done) => {
	browserSync.reload()
	done()
})

gulp.task('default', () => {

	browserSync.init({
		server: {
			baseDir: './build'
		}
	})

	gulp.watch('src/**/*.*', ['watch'])
})