const source_folder = "src";
const project_folder = "dist";

const path = {
  src: {
    html: source_folder + "/index.html",
    css: source_folder + "/assets/scss/main.scss",
    js: source_folder + "/assets/js/main.js",
    img: source_folder + "/assets/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/assets/fonts/*.ttf",
  },
  build: {
    html: project_folder + "/",
    css: project_folder + "/assets/css/",
    js: project_folder + "/assets/js/",
    img: project_folder + "/assets/img/",
    fonts: project_folder + "/assets/fonts/",
  },
  watch: {
    html: source_folder + "/index.html",
    css: source_folder + "/assets/scss/**/*.scss",
    js: source_folder + "/assets/js/main.js",
  },
  del: "dist",
};

// ################

const browser_sync = require("browser-sync").create();
const del = require("del");
const { src, dest } = require("gulp");
const gulp = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const group_media = require("gulp-group-css-media-queries");
const autoprefixer = require("gulp-autoprefixer");
const clean_css = require("gulp-clean-css");
const rename = require("gulp-rename");

// ################

function browserSync() {
  browser_sync.init({
    server: {
      baseDir: "./dist/",
    },
    port: 3000,
    notify: true,
  });
}

function clean() {
  return del(path.del);
}

function html() {
  return src(path.src.html)
    .pipe(dest(path.build.html))
    .pipe(browser_sync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(scss({ outputStyle: "expanded" }).on("error", scss.logError))
    .pipe(group_media())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true,
      })
    )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browser_sync.stream());
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
}

// ################

const build = gulp.series(clean, gulp.parallel(html, css));
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.clean = clean;
exports.default = watch;
