var gulp = require('gulp'),
    pug = require('gulp-pug'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
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
        .pipe(pug({
            data: {
                about: {
                    title: 'About Me',
                    name: 'Markus Klems',
                    portrait: 'https://avatars3.githubusercontent.com/u/493405?v=3&s=460',
                    github: 'https://github.com/markusklems',
                    email: 'klems@tu-berlin.de'
                }
            }
        }))
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
