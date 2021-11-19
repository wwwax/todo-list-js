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

function watchFiles() {
  gulp.watch([path.watch.html], html);
}

// ################

const build = gulp.series(clean, gulp.parallel(html));
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.clean = clean;
exports.default = watch;
