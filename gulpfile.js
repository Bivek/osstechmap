var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
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
    gulp.start('scripts', 'styles', 'pug', 'copy:data');
});

// Styles
gulp.task('styles', function() {
    return sass('app/styles/main.scss', {
            style: 'expanded'
        })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({
            message: 'styles task complete'
        }));
});

// JavaScripts
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

// HTML templating
gulp.task('pug', function() {
    return gulp.src('app/templates/**/*.pug')
        .pipe(data(function(file) {
            return require('./app/templates/' + path.basename(file.path) + '.json');
        }))
        .pipe(pug())
        .pipe(gulp.dest('dist'))
        .pipe(notify({
            message: 'pug task complete'
        }));
});

gulp.task('copy:data', function() {
    gulp.src(['app/data/**/*.json'])
        .pipe(gulp.dest('dist/data'));
});

gulp.task('clean', function() {
    return del(['dist/css', 'dist/js', 'dist/img', 'dist/**/*.html', 'dist/data']);
});

gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('app/styles/**/*.scss', ['styles']);

    // Watch image files
    //gulp.watch('app/img/**/*', ['images']);

    // Watch .js files
    gulp.watch('app/js/**/*.js', ['scripts']);

    // Watch .pug files
    gulp.watch(['app/templates/**/*.pug', 'app/templates/**/*.pug.json'], ['pug']);

    // Watch data files
    gulp.watch('app/data/**/*.json', ['copy:data']);

    // BrowserSync
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
    gulp.watch("dist/**/*").on('change', browserSync.reload);
});
