"use strict";
var gulp = require("gulp");
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var pkg = require('./package.json');

var dirs = pkg['h5bp-configs'].directories;
var devPort = pkg['h5bp-configs'].devPort;
var distPort = pkg['h5bp-configs'].distPort;

gulp.task('clean', function(done){
    require('del')([
        dirs.dist
    ]).then(function(){
        done();
    });
});

gulp.task('lint:js', function(){
    return gulp.src([
        'gulpfile.js',
        dirs.src + '/js/*.js'
    ]).pipe(plugins.jscs())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('copy', [
    'copy:html',
    'copy:bootstrap',
    'copy:jquery',
    'copy:js',
    'copy:css'
]);

gulp.task('copy:bootstrap', function(){
    return gulp.src(dirs.src + '/vendor/bootstrap/dist/**/*')
        .pipe(gulp.dest(dirs.dist + '/vendor/bootstrap/dist'));
});

gulp.task('copy:jquery', function(){
    return gulp.src(dirs.src + '/vendor/jquery/dist/**/*')
        .pipe(gulp.dest(dirs.dist + '/vendor/jquery/dist'));
});

gulp.task('copy:html', function(){
   return gulp.src(dirs.src + '/index.html')
       .pipe(plugins.htmlmin({collapseWhitespace: true}))
       .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:js', function(){
    return gulp.src(dirs.src + '/js/**/*.js')
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dirs.dist + '/js'));
});

gulp.task('copy:css', function(){
    return gulp.src(dirs.src + '/css/**/*.css')
        .pipe(plugins.minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(dirs.dist + '/css'));
});

gulp.task('build', function (done) {
    runSequence(['clean', 'lint:js'], 'copy', done);
});

gulp.task('serve-dev', function(){
    browserSync.init({
        server: {
            baseDir: "./src"
        },
        port: devPort
    });
    gulp.watch(dirs.src + '/*.html').on('change', browserSync.reload);
    gulp.watch(dirs.src + '/js/**/*.js').on('change', browserSync.reload);

});

gulp.task('serve', function(){
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        port: distPort
    });
});

gulp.task('default', ['build']);