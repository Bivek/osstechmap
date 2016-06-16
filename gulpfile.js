var gulp = require('gulp'),
    pug = require('gulp-pug'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    data = require('gulp-data'),
    path = require('path'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('default', ['clean'], function() {
    gulp.start('scripts');
});

gulp.task('scripts', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

gulp.task('pug', function() {
    return gulp.src('app/templates/**/*.pug')
        .pipe(data(function(file) {
            return require('./app/data/' + path.basename(file.path) + '.json');
        }))
        .pipe(pug())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});

gulp.task('watch', function() {
    // Watch .scss files
    //gulp.watch('app/scss/**/*.scss', ['styles']);

    // Watch image files
    //gulp.watch('app/img/**/*', ['images']);

    // Watch .js files
    gulp.watch('app/js/**/*.js', ['scripts']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});
