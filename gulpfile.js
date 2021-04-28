var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');
var autoprefix = require('autoprefixer');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

var browserSync =require('browser-sync').create();


gulp.task('clean', ()=>{
    return gulp.src('dist')
        .pipe(gulp.clean());
});


gulp.task('copy-html', ()=>{
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/.'))
        .pipe(browserSync.stream());
});

gulp.task('copy-images', ()=>{
    return gulp.src('src/image/**/*.*')
        .pipe(gulp.dest('dist/image/.'))
        .pipe(browserSync.stream());
});

gulp.task('copy-fonts', ()=>{
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts/.'))
        .pipe(browserSync.stream());
});


gulp.task('sass', ()=>{
    var postcssPlugins = [
        autoprefix(),
        cssnano()
    ];

    return gulp.src('src/style/**/*.scss')
        .pipe(sass())
        .pipe(postcss(postcssPlugins))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/style/.'))
        .pipe(browserSync.stream());
});

// gulp.task('build', gulp.series('clean', 'copy-html', 'copy-images', 'sass'));

gulp.task('build', gulp.series('copy-html', 'copy-images', 'copy-fonts', 'sass'));


gulp.task('sync', ()=>{
    browserSync.init({
        server: {
            baseDir: 'dist/.'
        }
    });
});

gulp.task('watch', ()=>{
    gulp.watch('src/**/*.html', gulp.task('copy-html'));
    gulp.watch('src/images/**/*.*', gulp.task('copy-images'));
    gulp.watch('src/style/**/*.scss', gulp.task('sass'));
});

gulp.task('build-watch', gulp.series('build', 'watch'));

gulp.task('default', gulp.parallel('build-watch', 'sync'));

