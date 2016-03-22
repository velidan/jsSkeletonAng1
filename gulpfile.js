(function(){
'use strict';

/* Paths */
const FRONTEND_SRC_PATH = "./engine/frontend/src",
        FRONTEND_BUILT_PATH = './engine/frontend/built',
        SERVER_SRC_PATH = './engine/server/src',
        SERVER_BUILT_PATH = './engine/server/built',
        SOURCE_FILE ='./engine/frontend/built/app/app.min.js', /* Source app file */
        FRONTEND_APPJS_DEST_FOLDER = './engine/frontend/built/app/'; /* Destination folder for main frontend app file */

var gulp = require('gulp'),
    concat = require('gulp-concat'), /* Contact files to one */
	uglify = require('gulp-uglify'), /* Minimize js */
	minifycss = require('gulp-minify-css'),
    webpack = require('webpack-stream'), 
    sourceMaps = require('gulp-sourcemaps'),
    ts = require('gulp-typescript'),
    babel = require('gulp-babel'),
    tsProject = ts.createProject('./tsconfig.json'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    clone = require('gulp-clone'), /* Allow to clone stream */
    plumber = require('gulp-plumber'), /* Error exceptions */
    beautify = require('gulp-cssbeautify'),
    combinemq = require('gulp-combine-media-queries'), /* Put media queries into bottom at main css file */
    rename = require('gulp-rename'), /* Allow to rename some stream */
    notify = require('gulp-notify'), /* Gulp throw exc on error */
    merge = require('merge-stream'), /* Concat streams */
    spritesmith = require('gulp.spritesmith'),
    watch = require('gulp-watch'),
    imageOptimize = require('gulp-image'),
    
    plumberOpts = {
	    errorHandler: notify.onError("Error: <%= error.message %>")
    };



/* 
 * Task for sprite creation. Stylus oriented with handlebars 
 * and my own retina-ready realization
 * without second sprite@x2 (for retina) like on all articles about retina sprites. 
 * Avoid unnecessary server request 
 */
gulp.task('sprites', function () {
    var spriteData = gulp.src(FRONTEND_SRC_PATH + '/images/spriteSource/*.*')
    .pipe(spritesmith({
        imgName : 'sprite.png',
        cssName : '_sprite.styl',
        cssFormat : 'stylus',
        algorithm : 'top-down',
        imgPath : '/images/sprite.png',
        cssTemplate : 'stylus.template.handlebars',
        cssVarMap: function(sprite) {
                sprite.name = 's_' + sprite.name;
            },
        padding : 5
        
    })),
    
    imgStream = spriteData.img
        .pipe(gulp.dest(FRONTEND_SRC_PATH + '/images/')),
        
    cssStream = spriteData.css
        .pipe(gulp.dest(FRONTEND_SRC_PATH + '/css/'));
    
    
    return merge(imgStream, cssStream);
});
   
/* 
 * Image optiomization
 */
gulp.task('imageOptimize', function () {
    return gulp.src(FRONTEND_SRC_PATH + '/images/*.*')
        .pipe(imageOptimize())
        .pipe(gulp.dest(FRONTEND_BUILT_PATH + '/images'));
})
    ;

/* 
 * Create index.css file with human-readable css format. 
 * Maybe some developer not know stylus or something like that.
 */
gulp.task('beautifyCss', function () {
    return gulp.src(FRONTEND_SRC_PATH + '/css/index.styl')
                    .pipe(plumber(plumberOpts))
                    .pipe(sourceMaps.init())
                    .pipe(stylus())
                    .pipe(sourceMaps.write())
					.pipe(beautify())
					.pipe(gulp.dest(FRONTEND_BUILT_PATH + '/css'));
});

/* 
 * Compile stylus to minify css
 */
gulp.task('stylus', function () {
  return gulp.src(FRONTEND_SRC_PATH + '/css/index.styl')
	.pipe(plumber(plumberOpts))
    .pipe(sourceMaps.init())
    .pipe(stylus())
	.pipe(minifycss())
    .pipe(sourceMaps.write())
	.pipe(rename('app.min.css'))
    .pipe(gulp.dest(FRONTEND_BUILT_PATH + '/css'));
});

/* 
 * Main frontend task. 
 * Webpack convert typescript\es6 with tsc|tsd|babel loaders to ES2015 and build one app file
 */
gulp.task('webpack', function () {
   return gulp.src(SOURCE_FILE)
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest(FRONTEND_APPJS_DEST_FOLDER)); 
});

/*
 * Handle jade templates to html (angular views)
 */
gulp.task('jade', function(){
    return gulp.src(FRONTEND_SRC_PATH + '/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest(FRONTEND_BUILT_PATH));
});

/*
 * Server main task. Use babel|typescript compiler for es6|typescript feature 
 */
gulp.task('serverTs', function () {
   return gulp.src(SERVER_SRC_PATH + '/**/*ts')
    .pipe(sourceMaps.init())
    .pipe(ts(tsProject))
    .pipe(babel({
         "presets": ["es2015"],
         "plugins": ["transform-runtime"]
    }))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(SERVER_BUILT_PATH)); 
});

/* 
 * Watchers  
 */
gulp.watch([FRONTEND_SRC_PATH + '/**/*.js', FRONTEND_SRC_PATH + '/**/*.ts'], ['webpack']);
gulp.watch([SERVER_SRC_PATH + '/**/*.ts'], ['serverTs']);
gulp.watch([FRONTEND_SRC_PATH + '/**/*.jade'], ['jade']);
gulp.watch([FRONTEND_SRC_PATH + '/**/*.styl'], ['beautifyCss', 'stylus']);


/* Gulp watch by default not tracking new or deleted files, so I used gulp-watch */
watch(FRONTEND_SRC_PATH + '/images/spriteSource/*', function () {
   gulp.start('sprites');
});

/* Gulp watch by default not tracking new or deleted files, so I used gulp-watch */
watch(FRONTEND_SRC_PATH + '/images/*', function () {
   gulp.start('imageOptimize');
});

gulp.task('default', ['webpack', 
                        'serverTs', 
                        'jade', 
                        'beautifyCss', 
                        'sprites', 
                        'stylus',
                        'imageOptimize']);


}());