const { src, dest, parallel, series, watch } = require("gulp");

// Load plugins

const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const concat = require("gulp-concat");
const clean = require("gulp-clean");
const changed = require("gulp-changed");
const browsersync = require("browser-sync").create();

// Clean style

function clear() {
  return src("./style/*", {
    read: false,
  }).pipe(clean());
}

// JS function

// function js() {
//   const source = "./src/**/*.js";

//   return (
//     src(source)
//       .pipe(changed(source))
//       // .pipe(concat("main.js"))
//       .pipe(dest("./style"))
//   );
//   //   .pipe(browsersync.stream())
// }

// CSS function

function css() {
  const source = "./src/scss/**/*.scss";

  return (
    src(source)
      .pipe(sass())
      .pipe(dest("./style/css/"))
  );
}
//Fonts

// function font() {
//   return (
//     src("./src/fonts/*woff")
//       .pipe(dest("./style/fonts"))
//   );
// }

// Watch files

function watchFiles() {
  watch("./src/sass/**/*.scss");
  
  // watch("./src/js/*", js);
  // watch("./src/images/*", img);
  // watch("./src/fonts/*", font);
}

// Tasks to define the execution of the functions simultaneously or in series

exports.watch = parallel(watchFiles);
exports.default = series(clear, parallel(css));
