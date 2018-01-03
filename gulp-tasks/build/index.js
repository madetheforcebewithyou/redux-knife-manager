import gulp from 'gulp';
import runSequence from 'run-sequence';
import gulpHelp from 'gulp-help';
import del from 'del';
import gulpUtil from 'gulp-util';
import babel from 'gulp-babel';

gulpHelp(gulp);

const config = {
  jsPath: [
    'lib/**/*.js',
    '!lib/**/__test__/*.js',
  ],
};

gulp.task('babel', false, () => {
  gulp.src(config.jsPath)
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('clean', false, () => {
  del.sync(['build']);
  gulpUtil.log('build cleaned');
});

gulp.task('build', 'Production build', ['clean'], (callback) => {
  runSequence(
    ['babel'],
    callback,
  );
});
