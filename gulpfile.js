"use strict";

// const projectFolder = "C:/wamp64/www/AliZip/";
const projectFolder = "./dist/";
const sourceFolder = "./src/";

const path = {
   build: {
      html: projectFolder,
      css: projectFolder + "assets/css/",
      js: projectFolder,
      img: projectFolder + "assets/img/",
      fonts: projectFolder + "assets/fonts/",
   },
   src: {
      html: [sourceFolder + "*.html", "!" + sourceFolder + "_*.html"],
      css: sourceFolder + "assets/scss/style.scss",
      js: sourceFolder + "js/main.js",
      img: sourceFolder + "assets/img/**/*.{jpg,png,svg,gif,ico,webp}",
      fonts: sourceFolder + "assets/fonts/**/*.{ttf,woff,woff2,otf,svg,eot}",
   },
   watch: {
      html: sourceFolder + "**/*.html",
      css: sourceFolder + "assets/scss/**/*.scss",
      js: sourceFolder + "js/**/*.js",
      img: sourceFolder + "assets/img/**/*.{jpg,png,svg,gif,ico,webp}",
   },
   clean: projectFolder
};

const gulp = require("gulp"),
      webpack = require("webpack-stream"),
      browsersync = require("browser-sync"),
      fileInclude = require('gulp-file-include'),
      scss = require('gulp-sass')(require('sass')),
      autoprefixer = require('gulp-autoprefixer'),
      groupMedia = require('gulp-group-css-media-queries'),
      cleanCss = require('gulp-clean-css'),
      rename = require('gulp-rename'),
      webp = require('gulp-webp'),
      webphtml = require('gulp-webp-html'),
      webpcss = require('gulp-webpcss'),
      imagemin = require('gulp-imagemin');

gulp.task("html", () => {
    return gulp.src(path.src.html)
      .pipe(fileInclude())
      .pipe(webphtml())
      .pipe(gulp.dest(path.build.html))
      .pipe(browsersync.stream());
});

gulp.task("css", () => {
  return gulp.src(path.src.css)
  .pipe(
     scss({
        outputStyle: 'expanded'
     })
  )
  .pipe(groupMedia())
  .pipe(
     autoprefixer({
        overrideBrowserlist: ['last 5 versions'],
        cascade: true
     })
  )
  .pipe(webpcss())
  .pipe(gulp.dest(path.build.css))
  .pipe(cleanCss())
  .pipe(
     rename({
        extname: '.min.css'
     })
  )
  .pipe(gulp.dest(path.build.css))
  .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
    return gulp.src(path.src.js)
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(projectFolder))
                .on("end", browsersync.reload);
});

gulp.task("images", () => {
  return gulp.src(path.src.img)
  .pipe(
     webp({
        quality: 70
     })
  )
  .pipe(gulp.dest(path.build.img))
  .pipe(gulp.src(path.src.img))
  .pipe(
     imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false}],
        interlaced: true,
        optimizationLevel: 3
     })
  )
     .pipe(gulp.dest(path.build.img))
     .pipe(browsersync.stream());
});

gulp.task("fonts", () => {
   return gulp.src(path.src.fonts)
      .pipe(gulp.dest(path.build.fonts));
});

gulp.task("copy-css", () => {
  return gulp.src("./src/assets/css/**/*.css")
              .pipe(gulp.dest(projectFolder + "assets/css"))
              .on("end", browsersync.reload);
});

gulp.task("copy-php", () => {
  return gulp.src("./src/assets/*.{php,json}")
              .pipe(gulp.dest(projectFolder + "assets/"))
              .on("end", browsersync.reload);
});

gulp.task("watch", () => {
    browsersync.init({
        server: {
            baseDir: projectFolder,
            serveStaticOptions: {
                extensions: ["html"]
            }
        },
		port: 9000,
		notify: false
    });
    
    gulp.watch(path.src.html, gulp.parallel("html"));
    gulp.watch(path.watch.css, gulp.parallel("css"));
    gulp.watch([path.watch.img], gulp.parallel("images"));
    gulp.watch(path.watch.js, gulp.parallel("build-js"));
    gulp.watch("./src/assets/css/**/*.*", gulp.parallel("copy-css"));
    gulp.watch("./src/assets/*.php", gulp.parallel("copy-php"));
});


gulp.task("build", gulp.parallel("html", "css", "images", "fonts", "copy-css", "copy-php", "build-js"));

gulp.task("default", gulp.parallel("watch", "build"));





// Once start tasks

gulp.task("build-prod-js", () => {
  return gulp.src("./src/js/main.js")
              .pipe(webpack({
                  mode: 'production',
                  output: {
                      filename: 'script.js'
                  },
                  module: {
                      rules: [
                        {
                          test: /\.m?js$/,
                          exclude: /(node_modules|bower_components)/,
                          use: {
                            loader: 'babel-loader',
                            options: {
                              presets: [['@babel/preset-env', {
                                  corejs: 3,
                                  useBuiltIns: "usage"
                              }]]
                            }
                          }
                        }
                      ]
                    }
              }))
              .pipe(gulp.dest(projectFolder));
});
