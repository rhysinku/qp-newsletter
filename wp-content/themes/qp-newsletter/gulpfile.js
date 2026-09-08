const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-dart-sass");
const gp_uglify = require("gulp-uglify");
const mmq = require("gulp-merge-media-queries");
const cleanCSS = require("gulp-clean-css");

// Per-post-type / single stylesheets: assets/css/single/*.css -> *.min.css.
// (Tailwind builds the main bundle separately — see package.json tw-build.)
function singleStyles() {
  return gulp
    .src(["./assets/css/single/**/*.css", "!./assets/css/single/**/*.min.css"], {
      base: "./assets/css",
      allowEmpty: true,
    })
    .pipe(sass().on("error", sass.logError))
    .pipe(mmq({ log: true }))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./assets/css"));
}

// Front-end script: assets/js/main.js -> main.min.js.
function mainJs() {
  return gulp
    .src("./assets/js/main.js", { allowEmpty: true })
    .pipe(gp_uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./assets/js"));
}

// Editor-side behaviour scripts: gutenberg/js/*.js -> *.min.js.
function gutenbergJs() {
  return gulp
    .src(["./gutenberg/js/*.js", "!./gutenberg/js/*.min.js"], { allowEmpty: true })
    .pipe(gp_uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./gutenberg/js"));
}

exports.css = gulp.series(singleStyles);
exports.js = gulp.series(mainJs, gutenbergJs);
