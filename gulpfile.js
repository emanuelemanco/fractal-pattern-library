'use strict';

const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const del = require('del');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const fractal = require('@frctl/fractal').create();
const util = require('gulp-util');
const logger = fractal.cli.console;
const hbshelpers = require('./helpers');
const hbs = require('@frctl/handlebars')({helpers: hbshelpers});
const yaml = require('js-yaml');
const fs = require('fs');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const named = require('vinyl-named');
const webpackConfig = require('./webpack.config');

const PRODUCTION = !!util.env.production;

/*
Paths
*/

const { PATHS, SITE } = loadConfig();

function loadConfig() {
    let ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}

/*
Fractal configuration
*/

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

//custom ui
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
        "/css/theme.css",
        "/css/style.css"
    ],
    scripts: [
        "default",
        "/js/theme.js"
    ]
});
fractal.web.theme(customTheme);

gulp.task('fractal:start', function(){
    const server = fractal.web.server({
        sync: true
    });
    server.on('error', err => logger.error(err.message));
    return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
    });
    done();
});

gulp.task('fractal:build', function(){
    const builder = fractal.web.builder();
    builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
    builder.on('error', err => logger.error(err.message));
    return builder.build().then(() => {
        logger.success('Fractal build completed!');
    });
    done();
});

/*
SASS
*/

gulp.task('sass', done => {
    done();

    return gulp.src(`${PATHS.public}/css/**/*.scss`)
        .pipe(sass({
            outputStyle: PRODUCTION ? 'compressed' : 'expanded',
            includePaths: PATHS.sass
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(`${PATHS.public}/css/`));

});

/*
JS
*/
let webpackConfigSetting = webpackConfig.dev;
gulp.task('webpack', done => {

    if (PRODUCTION) {
        webpackConfigSetting = webpackConfig.prod;
    }

    webpack(webpackConfigSetting, function (err, stats){
        if (err) {
            console.log(err);
        }
    });

    done();
});

/*
Watch
*/

gulp.task('watch', done => {
    gulp.watch(`${PATHS.components}/**/*.scss`, gulp.series('sass'));
    gulp.watch(`${PATHS.public}/css/**/*.scss`, gulp.series('sass'));
    gulp.watch(`${PATHS.components}/**/*.js`, gulp.series('webpack'));
    gulp.watch(`${PATHS.public}/js/app/*.js`, gulp.series('webpack'));
    gulp.watch(`${PATHS.public}/js/vendor/*.js`, gulp.series('webpack'));

    done();
});

/*
Clean
*/

gulp.task('build:clean', done => {
    done();
	return del(['build']);
});

/*
Default tasks
*/

gulp.task('default', gulp.parallel('webpack', 'sass', 'watch', 'fractal:start'));
gulp.task('build', gulp.series('build:clean', ['webpack', 'sass'], 'fractal:build'));
