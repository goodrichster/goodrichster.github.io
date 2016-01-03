var gulp = require('gulp'),
    del = require('del'),
    header = require('gulp-header'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    amdOptimize = require("amd-optimize"),
    runSequence = require('run-sequence'),
    replace = require('gulp-replace'),
    gutil = require('gulp-load-utils')(['env', 'date', 'colors']);


var opts = {
        pkg: require('./package.json'),
        banner: '/*! <%= pkg.banner %> <%= pkg.version %> - <%= date %> - <%= user %> */\n',
        dt: gutil.date('yyyy-mm-dd h:MM:ss TT Z'),
        username: ( process.platform === 'darwin' ) ? 
            process.env.USER.substr(0,4) : 
            process.env.USERNAME,
        dist: './dist',
        distCss: './dist/css',
        distJs: './dist/js',
        distDocs: './dist/docs',
        distImg: './dist/images/framework/3.0',
        src: './src',
        srcCss: './src/css',
        srcJs: './src/js',
        destDev: ( process.platform === 'darwin' ) ? 
            '/Volumes/__nas-dev_dev_webfarm/htdocs/wwwhbs/shared' : 
            '\\\\nas-dev\\dev_webfarm\\htdocs\\wwwhbs\\shared',
        destDevSecure: ( process.platform === 'darwin' ) ? 
            '/Volumes/__nas-dev_stage_webfarm/htdocs/securelib/static/shared' : 
            '\\\\nas-dev\\stage_webfarm\\htdocs\\securelib\\static\\shared',
        destProd: ( process.platform === 'darwin' ) ? 
            '/Volumes/__nas-prd_prod_webfarm/htdocs/wwwhbs/shared' : 
            '\\\\nas-prd\\prod_webfarm\\htdocs\\wwwhbs\\shared'
    }

gulp.task('build:css', function() {
    var less = require('gulp-less'),
        minifycss = require('gulp-minify-css');

    var stream = gulp.src(opts.srcCss + '/framework.less')
        .pipe(plumber({errorHandler: reportError}))
        .pipe(less({compress:true}))
        //.pipe(minifycss({compatibility: 'ie7', processImport: false}))
        .pipe(header(opts.banner, { pkg: opts.pkg, date: opts.dt, user: opts.username } ))
        .pipe(replace('}','}\n'))
        .pipe(gulp.dest(opts.distCss))
    return stream;
});


gulp.task('build:img', function() {
    var stream = gulp.src(opts.src + '/images/framework/3.0/framework.png')
        .pipe(gulp.dest(opts.distImg))
    return stream;
});

gulp.task('build:docs', function() {
    var stream = gulp.src(opts.src + '/docs/*.html')
        .pipe(gulp.dest(opts.distDocs))
    return stream;
});


/* MJ:
   - Tested uglify on js. Greatly reduces filesize but increases build time - really just an issue for watch. 
   - Maybe watch should break out into watch:css, watch:js. Or dev build doesn’t uglify, only prod build does. Commented out for now.
 */
gulp.task('build:js', function() {
    var concat = require('gulp-concat'),
        eventStream = require('event-stream'),
        uglify = require('gulp-uglify');

    var options = {
      paths: {"jquery":"framework/jquery"},
      baseUrl: opts.srcJs
    };

    
    var amdStream = gulp.src([opts.srcJs + '/framework/*.js'])
        .pipe(plumber({errorHandler: reportError}))
        .pipe(amdOptimize("framework/js-framework",options))

    return eventStream.merge(
                                gulp.src(opts.srcJs + '/framework/require.js'),
                                gulp.src(opts.srcJs + '/framework/framework.main.js'),
                                gulp.src(opts.srcJs + '/framework/polyfills.js'),
                                gulp.src(opts.srcJs + '/framework/jquery.*.js'),
                                amdStream
                            )
                            .pipe(concat('framework.js'))
                            //.pipe(uglify({preserveComments: 'some'}))
                            .pipe(header(opts.banner, { pkg: opts.pkg, date: opts.dt, user: opts.username } ))
                            .pipe(gulp.dest(opts.distJs));

});

gulp.task('build:widgets', function() {
    var concat = require('gulp-concat'),
        uglify = require('gulp-uglify');

    var stream = gulp.src([
            opts.srcJs + '/widgets/widgets.main.js', opts.srcJs + '/widgets/widgets.*.js', 
            opts.srcJs + '/widgets/vendor/*.js'])
        .pipe(plumber({errorHandler: reportError}))
        .pipe(concat('widgets.js'))
        //.pipe(uglify({preserveComments: 'some'}))
        .pipe(header(opts.banner, { pkg: opts.pkg, date: opts.dt, user: opts.username } ))
        .pipe(gulp.dest(opts.distJs))
    return stream;
});


gulp.task('min:images', function() {
    return;
    var imagemin = require('gulp-imagemin');

    var stream = gulp.src(opts.src + '/images/**')
        .pipe(plumber({errorHandler: reportError}))
        .pipe(newer(opts.dist + '/images'))
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(opts.dist + '/images'));
    return stream;
});

gulp.task('copy:fonts', function () {
    var stream = gulp.src(opts.src + '/fonts/**')
        .pipe(gulp.dest(opts.dist + '/fonts'));
    return stream;
});

gulp.task('lint:js', function() {
    var jshint = require('gulp-jshint');

    var stream = gulp.src([
            opts.srcJs + '/framework/*.js', opts.srcJs + '/widgets/*.js',
            '!./src/js/framework/jquery*.js','!./src/js/framework/require*.js','!./src/js/framework/*.min.js',
            '!./src/js/framework/modernizr*.js'])
        .pipe(plumber({errorHandler: reportError}))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
    return stream;
});

gulp.task('clean:dist', function(cb) {
    del(opts.dist + '/*', function(err, paths) {
        if (err) return cb(err);
        console.log('Deleted files/folders:\n', paths.join('\n'));
        cb();
    });
});

gulp.task('copy:dev',['copy:dev-secure'],function () {
    // Todo: only copy over newer files
    var stream = gulp.src([opts.dist + '/*/*.js', opts.dist + '/*/*.css',  opts.dist + '/*/*.html'])
        .pipe(plumber({errorHandler: reportError}))
        .pipe(gulp.dest( opts.destDev ))
    return stream;
});

gulp.task('copy:dev-secure', function () {
    // Todo: only copy over newer files
    var stream = gulp.src([opts.dist + '/*/*.js', opts.dist + '/*/*.css',  opts.dist + '/*/*.html'])
        .pipe(plumber({errorHandler: reportError}))
        .pipe(gulp.dest( opts.destDevSecure ));
    return stream;
});


gulp.task('copy:prod', function () {
    // Todo: delete files on destination before copying over new
    var stream = gulp.src([opts.dist + '/*/*.js', opts.dist + '/*/*.css'])
        .pipe(plumber({errorHandler: reportError}))
        .pipe(gulp.dest( opts.destProd ));
    return stream;
});

gulp.task('watch', function() {

    var log = function(event) {console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');}
    
    gulp.watch(opts.srcCss + '/less/*.less', function(){
        runSequence('build:css','copy:dev');
    }).on('change',log);
    
    gulp.watch([opts.srcJs + '/framework/*'], function(){
        runSequence('build:js','copy:dev');
    }).on('change',log);

    gulp.watch([opts.src + '/docs/*.html'], function(){
        runSequence('build:docs','copy:dev');
    }).on('change',log);

    gulp.watch(opts.srcJs + '/widgets/*', function(){
        runSequence('build:widgets','copy:dev');
    }).on('change',log);
    
    //gulp.watch(opts.src + '/images/**', ['min:images']).on('change',log);
    //gulp.watch(opts.src + '/fonts/**', ['copy:fonts']).on('change',log);
    
});

gulp.task('compress',['build'],function(){
    var uglify = require('gulp-uglify');

    var stream = gulp.src(opts.dist + '/js/*.js')
     .pipe(plumber({errorHandler: reportError}))
     .pipe(uglify({preserveComments: 'some'}))
     .pipe(gulp.dest(opts.distJs))
     
    return stream;
})

gulp.task('build', ['build:css', 'build:js', 'build:widgets','build:img']);

gulp.task('default', ['clean:dist'], function () {
    gulp.start('build');
});

gulp.task('deploy:dev', ['compress'], function () {
    gulp.start('copy:dev');
});

var reportError = function(error) {

    notify({
        title: 'Task Failed [' + error.plugin + ']',
        message: (error.lineNumber) ? 'LINE ' + error.lineNumber : '',
        sound: 'Sosumi'
    }).write(error);

    //gutil.beep();

    var report = '';
    var chalk = gutil.colors.white.bgRed;

    report += chalk('TASK:') + ' [' + error.plugin + ']\n';
    report += chalk('PROB:') + ' ' + error.message + '\n';
    if (error.lineNumber) { report += chalk('LINE:') + ' ' + error.lineNumber + '\n'; }
    if (error.fileName)   { report += chalk('FILE:') + ' ' + error.fileName + '\n'; }
    console.error(report);

    this.emit('end'); // Prevent the 'watch' task from stopping on error
}