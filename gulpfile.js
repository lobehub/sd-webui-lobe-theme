const gulp = require('gulp')
const less = require('gulp-less')
const ts = require('gulp-typescript')

const tsProject = ts.createProject('tsconfig.json')
gulp.task('compile', () => {
  return gulp.src('src/script/**/*.ts').pipe(tsProject()).pipe(gulp.dest('javascript'))
})

gulp.task('less', () => {
  return gulp.src('src/theme/*.less').pipe(less()).pipe(gulp.dest('./'))
})

gulp.task('build', gulp.parallel('compile', 'less'))

gulp.task('watch', () => {
  gulp.watch('src/theme/**/*', gulp.parallel('less'))
  gulp.watch('src/script/**/*', gulp.parallel('compile'))
})
