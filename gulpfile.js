var gulp = require('gulp'),
    pug = require('gulp-pug'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    data = require('gulp-data'),
    path = require('path'),
    notify = require('gulp-notify'),
    del = require('del');

var browserSync = require('browser-sync').create();

gulp.task('default', ['clean'], function() {
    gulp.start('pug', 'scripts');
});

gulp.task('scripts', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({
            message: 'scripts task complete'
        }));
});

gulp.task('pug', function() {
    return gulp.src('app/templates/**/*.pug')
        .pipe(data(function(file) {
            return require('./app/data/' + path.basename(file.path) + '.json');
        }))
        .pipe(pug())
        .pipe(gulp.dest('dist'))
        .pipe(notify({
            message: 'pug task complete'
        }));
});

gulp.task('clean', function() {
    return del(['dist/css', 'dist/js', 'dist/img', 'dist/**/*.html']);
});

gulp.task('watch', function() {
    // Watch .scss files
    //gulp.watch('app/scss/**/*.scss', ['styles']);

    // Watch image files
    //gulp.watch('app/img/**/*', ['images']);

    // Watch .js files
    gulp.watch('app/js/**/*.js', ['scripts']);

    // BrowserSync it
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});
