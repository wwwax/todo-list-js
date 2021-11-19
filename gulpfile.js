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
    html: source_folder + "index.html",
    css: source_folder + "/assets/scss/**/*.scss",
    js: source_folder + "/assets/js/main.js",
  },
  del: "",
};
