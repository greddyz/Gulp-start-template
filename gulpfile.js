'use strict';

var
    gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    pug             = require('gulp-pug'),
    browserSync     = require('browser-sync'),
    rigger          = require('gulp-rigger'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglifyjs'),
    cssnano         = require('gulp-cssnano'),
    rename          = require('gulp-rename'),
    imagemin        = require('gulp-imagemin'),
    pngquant        = require('imagemin-pngquant'),
    autoprefixer    = require('gulp-autoprefixer'),
    jsHint          = require('gulp-jshint'),
    jsHintStylish   = require('jshint-stylish'),
    spritesmith     = require('gulp.spritesmith'),
    colors          = require('colors'),

    startServer     = true,
    srcDir          = 'src',
    buildDir        = 'dist',
    
    serverConfig = {
        open: false,
        notify: false,
        server: {
            baseDir: buildDir,
            //directory: true
        }
    },

    path = {
        src: {
            pug:            srcDir+'/pug/*.pug',
            sass:           srcDir+'/sass/main.sass',
            js:             srcDir+'/script/plugins.js',
            jsHint:         srcDir+'/script/app.js',
            img:            srcDir+'/img/**/*',
            images:         srcDir+'/images/**/*',
            fonts:          srcDir+'/fonts/**/*',
            icons:          srcDir+'/img/icons/icon*.*',
            spriteImgName:  'sprite.png',
            spriteCssName:  '../sass/includes/_sprite.sass',
        },
        build: {
            html:           buildDir,
            css:            buildDir+'/css',
            cssName:        'main.css',
            js:             buildDir+'/js/',
            jsName:         'main.js',
            img:            buildDir+'/img/',
            images:         buildDir+'/images/',
            spriteDir:      srcDir+'/img/',
            fonts:          buildDir+'/fonts/'
        },
        watch: {
            html:           buildDir+'/*.html',
            style:          srcDir+'/sass/**/*.sass',
            pug:            srcDir+'/pug/**/*.pug',
            js:             srcDir+'/script/**/*.js',
            img:            srcDir+'/img/*',
            images:         srcDir+'/images/*',
            fonts:          srcDir+'/fonts/**/*',
            icons:          srcDir+'/img/icons/icon*.*'
        }
    };

// log errors
function log(error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------".red,
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------".red,
        ''
    ].join('\n'));
    this.end();
}

/*  --------------------------------------------------
 PUG
 -------------------------------------------------- */
gulp.task('pug', function(){
    return gulp.src(path.src.pug)
        .pipe(pug({pretty: true})).on('error', log)
        .pipe(gulp.dest(path.build.html))
});

/*  --------------------------------------------------
 SASS
 -------------------------------------------------- */
gulp.task('sass', function(){
    return gulp.src(path.src.sass)
        .pipe(sass()).on('error', log)
        .pipe(autoprefixer())
        ///.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css))
});

/*  --------------------------------------------------
 JS hint
 -------------------------------------------------- */
gulp.task('jshint', function(){
    return gulp.src(path.src.jsHint)
        .pipe(jsHint())
        .pipe(jsHint.reporter(jsHintStylish))
});

/*  --------------------------------------------------
 JS
 -------------------------------------------------- */
gulp.task('js', ['jshint'], function(){
    return gulp.src(path.src.js)
        .pipe(rigger())
        //.pipe(uglify())
        .pipe(rename(path.build.jsName))
        .pipe(gulp.dest(path.build.js));
});

/*  --------------------------------------------------
 IMG - theme files
 -------------------------------------------------- */
gulp.task('img', function(){
    return gulp.src(path.src.img)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path.build.img));
});

/*  --------------------------------------------------
 IMAGES - user files
 -------------------------------------------------- */
gulp.task('images', function(){
    return gulp.src(path.src.images)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path.build.images));
});

/*  --------------------------------------------------
 FONTS
 -------------------------------------------------- */
gulp.task('fonts', function(){
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

/*  --------------------------------------------------
 Sprite images
 -------------------------------------------------- */
gulp.task('sprite', function () {
    return gulp.src(path.src.icons)
        .pipe(spritesmith({
            // imgPath: path.src.spriteImgPath,
            cssName: path.src.spriteCssName,
            imgName: path.src.spriteImgName

        }))
        .pipe(gulp.dest(path.build.spriteDir));
});

/*  --------------------------------------------------
 Watch
 -------------------------------------------------- */
gulp.task('watch', ['browser-sync',  'sass', 'pug', 'js', 'sprite', 'img', 'images', 'fonts'], function(){
    gulp.watch(path.watch.pug, ['pug']);
    gulp.watch(path.watch.style, ['sass']).on('change', browserSync.reload);
    gulp.watch(path.watch.js, ['js']).on('change', browserSync.reload);
    gulp.watch(path.watch.icons, ['sprite']).on('change', browserSync.reload);
    gulp.watch(path.watch.img, ['img']).on('change', browserSync.reload);
    gulp.watch(path.watch.images, ['images']).on('change', browserSync.reload);
    gulp.watch(path.watch.fonts, ['fonts']).on('change', browserSync.reload);
    gulp.watch(path.watch.html, browserSync.reload);
});

/*  --------------------------------------------------
 Live Reload
 -------------------------------------------------- */
gulp.task('browser-sync', function(){
    if(startServer) {
        browserSync.init(serverConfig);
    }
});
