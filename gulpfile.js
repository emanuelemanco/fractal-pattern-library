'use strict';

const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const flatten = require('gulp-flatten');
const del = require('del');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);
const pump = require('pump');
const autoprefixer = require('gulp-autoprefixer');
const fractal = require('@frctl/fractal').create();
const util = require('gulp-util');
const logger = fractal.cli.console;
const hbshelpers = require('./helpers');
const hbs = require('@frctl/handlebars')({helpers: hbshelpers});
const yaml = require('js-yaml');
const fs = require('fs');
const stream = require('webpack-stream');
const webpack = require('webpack');
const named = require('vinyl-named');
const webpackConfig = require('./webpack.config');

const modernConfig = require('./webpack.modern.js');
const legacyConfig = require('./webpack.legacy.js');

let PRODUCTION = !!util.env.production;

// Paths Setup
const { PATHS, SITE } = loadConfig();

function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}


// Fractal Setup 
fractal.set('project.title', SITE.title);
fractal.docs.set('path', PATHS.doc);
fractal.web.set('builder.dest', PATHS.build);
fractal.web.set('static.path', PATHS.public);
fractal.components.set('path', PATHS.components);
fractal.components.set('default.preview', '@default');
fractal.components.engine(hbs);
fractal.components.set('statuses', {
    wip: {
        label: "WIP",
        description: "Work in progress. Implement with caution.",
        color: "#FF9233"
    },
    ready: {
        label: "Ready",
        description: "Ready to implement.",
        color: "#29CC29"
    },
    review: {
        label: "For Review",
        description: "Ready for design review",
        color: "#B40087"
    }
});



// Custom Fractal Mandelbrot UI
const mandelbrot = require('@frctl/mandelbrot');
const customTheme = mandelbrot({
    lang: "en-gb",
    rtl: false,
    format: "json",
    favicon: 'favicon.ico',
    skin: "default",
    nav: ["docs", "components"],
    panels: ["html", "view", "context", "resources", "info", "notes"],
    styles: [
        "default",
        "/css/fractal-theme.css",
        "/css/components.css"
    ]/*,
    scripts: [
        "default",
        "/js/theme.js"
    ]*/
});
fractal.web.theme(customTheme);

gulp.task('fractal:start', done=> {
    const server = fractal.web.server({
        sync: true,
        syncOptions: {
            open: true,
            browser: ['Chrome'],
            notify: true
        }
    });
    server.on('error', err => logger.error(err.message));
    
    server.start().then(() => {
        logger.success(`Fractal server is now up and running!`);
        logger.log(util.colors.cyan(`Local: ${server.url}`));
        logger.log(util.colors.cyan(`Network: ${server.urls.sync.external}`));
    });

    done();
});

gulp.task('fractal:build', done=> {
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    
    builder.build().then(() => {
        logger.success('Fractal build completed!');
    });

    done();
});


// SASS
gulp.task('sass', done => {

    gulp.src(`${PATHS.public}/css/**/*.scss`)
        .pipe(sass({
            outputStyle: PRODUCTION ? 'compressed' : 'expanded',
            includePaths: PATHS.sass
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: PRODUCTION ? '.min' : '' }))
        .pipe(gulp.dest(`${PATHS.public}/css/`));

    done();

});


// Webpack Environment Flag
let webpackConfigSetting = webpackConfig.dev;
gulp.task('webpack', done => {

    //if (PRODUCTION) { webpackConfigSetting = webpackConfig.prod; }

    /*webpack(webpackConfigSetting, function (err, stats){
        if (err) { console.log(err);}
    });*/

    done();
});



// Modern ES6 Bundle
gulp.task('modern', done => {
    gulp.src(['./src/js/app.js'])
      .pipe(named())
      .pipe(stream( Object.assign({ mode: PRODUCTION ? 'production' : 'development',}, modernConfig) ), webpack)
      .pipe(PRODUCTION ? gulp.dest(`${PATHS.build}/js`) : gulp.dest(`${PATHS.public}/js`))
      .on('end', () => { done(); });
});

// Legacy ES5 Bundle with polyfills and transpilers
gulp.task('legacy', done => {
    gulp.src('./src/js/app.js')
      .pipe(named())
      .pipe(stream( Object.assign({mode: PRODUCTION ? 'production' : 'development'}, legacyConfig) ), webpack)
      .pipe(PRODUCTION ? gulp.dest(`${PATHS.build}/js`) : gulp.dest(`${PATHS.public}/js`))
      .on('end', () => { done(); });
});

// group both bundles into one task sequentially
gulp.task('bundles', gulp.series('modern', 'legacy') );


// Creates a minified version of each module for production environment
gulp.task('modules', done => {
    gulp.src(`${PATHS.src}/components/**/*.js`) // path to your file
    .pipe(concat('modules.js'))
    //.pipe(uglify())
    .on('error', function (err) { util.log(util.colors.red('[Error]'), err.toString()); })  // show errors
    .pipe(flatten())
    //.pipe(rename({ suffix: PRODUCTION ? '.min' : '' }))
    .pipe(gulp.dest( `${PATHS.src}/js`));

    done();
});




// Watch task for dev environment
gulp.task('watch', done => {
    gulp.watch(`${PATHS.components}/**/*.scss`, gulp.series('sass'));
    gulp.watch(`${PATHS.public}/css/**/*.scss`, gulp.series('sass'));
    gulp.watch(`${PATHS.components}/**/*.js`, gulp.series('webpack'));
    gulp.watch(`${PATHS.src}/js/**/*.mjs`, gulp.series('modern'));  // compile main js

    //gulp.watch(`${PATHS.public}/js/app/*.js`, gulp.series('webpack'));
    //gulp.watch(`${PATHS.public}/js/vendor/*.js`, gulp.series('webpack'));

    done();
});


// Clean
gulp.task('build:clean', done => {
    PRODUCTION = true;
    del(['build']);

    done();
});


// Default tasks
gulp.task('default', gulp.series('webpack', 'modern', 'sass', 'watch', 'fractal:start'));
gulp.task('build', gulp.series('build:clean', 'webpack', 'bundles', 'sass', 'fractal:build'));
