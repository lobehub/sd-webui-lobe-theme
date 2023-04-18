const gulp = require('gulp')
const shell = require('gulp-shell')

gulp.task('umi-build', shell.task('yarn umi build'))
gulp.task('mv', shell.task('mv ./dist/index.js ./javascript/index.js && mv ./dist/index.css ./style.css'))
gulp.task('clean', shell.task('rm -r dist'))

gulp.task('build', gulp.series('umi-build', 'mv', 'clean'))

gulp.task('watch', () => {
  gulp.watch('src/**/*', gulp.series('build'))
})
