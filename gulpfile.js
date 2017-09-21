var gulp = require("gulp"), 
    $ = require("gulp-load-plugins")({ 
        lazy: true 
    }), 
    sass = require("gulp-sass"), 
    autoprefixer = require("gulp-autoprefixer"), 
    plumber = require("gulp-plumber"), 
    browserSync = require("browser-sync"), 
    del = require("del"), 
    useref = require("gulp-useref"), 
    uglify = require("gulp-uglify"), 
    concat = require("gulp-concat"), 
    gulpif = require("gulp-if"), 
    imagemin = require("gulp-imagemin"), 
    runSequence = require('run-sequence'), 
    ftp = require('vinyl-ftp'), 
    argv = require('yargs').argv; 

gulp.task("css", function() {
    return gulp.src('sass/style.scss')
        .pipe(plumber()) 
        .pipe(sass.sync({ 
            outputStyle: "compressed" // "expanded" 
            })) 
        .pipe(autoprefixer({ 
            browsers: ["last 3 version", "IE 9"] 
        })) 
        .pipe(gulp.dest("css/")) 
        .pipe(browserSync.stream());
}); 
gulp.task("images", function(){ 
    return gulp.src("./images/**/*", { 
        base: "dist/" 
    }) 
        .pipe(imagemin()) 
        .pipe(gulp.dest("./")); 
}); 
gulp.task("server", function(){
    browserSync.init({ 
        //server: "./" 
        proxy: "http://localhost/office/"
    }); 
}); 
gulp.task("watch", function(){ 
    gulp.watch("./sass/*.scss", ['css']);
    gulp.watch(["./index.html", "./js/*.js"], browserSync.reload);
    gulp.watch(["./index.php", "./oferta.php"], browserSync.reload);
    
}); 
gulp.task("html", function(){ 
    gulp.src("./*.html") 
        .pipe(useref()) 
        .pipe(gulpif("*.js", uglify() )) 
        .pipe(gulp.dest('./')); 
}); 
gulp.task("online", function(){
    gulp.watch("./**/*.scss", ['css']);
    gulp.watch(['C:/xampp/htdocs/office/css/style.css'], ['deploy']);
});

gulp.task("default", ["css", "server", "watch"]);
