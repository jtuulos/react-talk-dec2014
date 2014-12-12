var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    del = require('del'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    objectAssign = require('object-assign');

// Load plugins
var $ = require('gulp-load-plugins')();

var VENDOR_STYLES = [
    'node_modules/reveal.js/css/reveal.css',
    'node_modules/reveal.js/css/theme/sky.css',
    'node_modules/highlight.js/styles/zenburn.css'
];

// Build a Browserify bundle and save to specified script under dist/
function bundleTo(bundler, fileName) {
    return bundler
        .bundle()
        .pipe(source(fileName))
        .pipe(buffer())
        .pipe(gulp.dest('dist/scripts'))
        .pipe($.connect.reload());
}

function getAppBuilder(opts) {
    var opts = opts || {};

    // https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
    return function() {
        var browserifyOpts = {
            entries: ['./src/index.js'],
            debug: true
        };

        if (opts.watchify) {
            browserifyOpts = objectAssign(watchify.args, browserifyOpts);
        }

        var bundler = browserify(browserifyOpts);

        if (opts.watchify) bundler = watchify(bundler);

        function rebundle() {
            return bundleTo(bundler, 'bundle.js');
        }

        if (opts.watchify) {
            bundler.on('update', rebundle);
        }

        return rebundle();
    };
}


gulp.task('clean', function(cb) {
    return del(['dist/**'], cb);
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe($.connect.reload());
});

gulp.task('styles', function() {
    return gulp.src(VENDOR_STYLES)
        .pipe($.concatCss('bundle.css'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.connect.reload());
});

gulp.task('scripts', getAppBuilder());
gulp.task('scripts:watchify', getAppBuilder({ watchify: true }));

gulp.task('build:noscripts', ['html', 'styles']);

gulp.task('build', ['build:noscripts', 'scripts']);

gulp.task('connect', function() {
    $.connect.server({
        root: 'dist',
        port: 7777,
        livereload: true
    });
});

gulp.task('watch', ['build:noscripts', 'connect', 'scripts:watchify'], function() {
    gulp.watch('src/*.html', ['html']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
