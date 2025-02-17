const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))

gulp.task('sass', function(){
    return gulp.src('./src/assets/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build/css/'))

})