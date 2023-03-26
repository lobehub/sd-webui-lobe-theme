const gulp = require('gulp');
const less = require('gulp-less');

gulp.task('less', function () {
  return gulp.src('src/theme/*.less').pipe(less()).pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
  gulp.watch('src/theme/**/*', gulp.parallel('less'));
});
