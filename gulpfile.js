var gulp = require('gulp');
var rename = require("gulp-rename");
var prefix = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var rev = require('gulp-rev-append');
var less = require('gulp-less');
var concat = require('gulp-concat');
var csscomb = require('gulp-csscomb');
var cssmin = require('gulp-cssmin');

// rev 
gulp.task('rev_append', function() {
  gulp.src('.')
    .pipe(rev())
    .pipe(gulp.dest('.'));
});

// connect
gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

// csscomb
gulp.task('csscomb', function(){
    return gulp.src('css/less/**/*.less')
            .pipe(prefix({browsers: ['last 5 version'], cascade: false}))
            .pipe(csscomb())
            .pipe(gulp.dest('css/less/'))
});
// less
gulp.task('less', function(){
	return gulp.src('css/less/**/*.less')
		.pipe(concat('styles.less'))
    	.pipe(less('styles.less'))
    	.pipe(gulp.dest('css/'))
    	//.pipe(connect.reload());
});

// css
gulp.task('css', ['csscomb', 'less'], function (){
  gulp.src('css/styles.css')
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css/'))
    .pipe(connect.reload());
});

// html 
gulp.task('html', function(){
	gulp.src('**/*.html')
	.pipe(connect.reload());
});

// watch
gulp.task('watch', function(){
	gulp.watch('css/less/**/*.less', ['css'])
	//gulp.watch('css/**/*.css', ['css'])
	gulp.watch('./**/*.html', ['html'])
});

gulp.task('default', ['connect', 'html', 'css', 'rev_append',  'watch']);