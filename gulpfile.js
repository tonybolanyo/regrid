var gulp = require("gulp"),
    sass = require("gulp-sass"),
    browserSync = require("browser-sync"),
    gulpCopy = require("gulp-copy");

// for development, use de default task
gulp.task('default', ["html", "sass"], function() {

    // run browser sync
    browserSync.init({ server: "dist/" });
    
    // watch any changes on sass files
    gulp.watch(["src/*.scss", "src/**/*.scss"], ["sass"]);

    // watch any changes on html files
    gulp.watch(["src/*.html"], ["html"]);
});

// simply copy html files to dist
// and reload browsers
gulp.task("html", function() {
    gulp.src("src/*.html")
        .pipe(gulpCopy("dist/", { prefix: 1 }))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream())
});

gulp.task("sass", function() {
    gulp.src("src/regrid.scss")
        .pipe(sass().on("error", function(error) {
            return notify().write(error);
        }))
        .pipe(gulp.dest("dist/regrid"))
        .pipe(browserSync.stream())
});