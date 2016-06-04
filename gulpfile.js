// ----- config ----- //

var packageName = 'imlazy.pkgd.js';

var gulp = require('gulp');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');

// ----- hint ----- //

var jshint = require('gulp-jshint');

gulp.task( 'hint-js', function() {
  return gulp.src( 'js/**/*.js' )
  .pipe( jshint({
    esversion: 6
  }))
  .pipe( jshint.reporter('default') );
});

gulp.task( 'hint-task', function() {
  return gulp.src( 'gulpfile.js' )
  .pipe( jshint() )
  .pipe( jshint.reporter('default') );
});

gulp.task( 'hint-test', function() {
  return gulp.src( 'test/unit/*.js' )
  .pipe( jshint() )
  .pipe( jshint.reporter('default') );
});

gulp.task( 'hint', [ 'hint-js', 'hint-task', 'hint-test' ] );

// ----- browserify + babel ----- //

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babel = require('gulp-babel');
var fs = require('fs');
var insert = require('gulp-insert');

function getLicense() {
  return fs.readFileSync('copyright.md');
}

// dependency: babel-preset-es2015

gulp.task('clean:js', function() {
  return gulp.src( [ 'dist/*.js' ], {
      read: false
  })
  .pipe( rimraf() );
});

gulp.task( 'browserify-babel', [ 'clean:js' ], function() {
  return browserify( 'js/index.js' )
  .bundle()
  .on( 'error', function(err) {
    console.log(err.toString());
    this.emit('end');
  })
  .pipe( source( packageName ) )
  .pipe( buffer() )
  .pipe( babel({
    presets: ['es2015']
  }))
  .pipe( insert.prepend( getLicense() ) )
  .pipe( gulp.dest( 'dist' ) );
});

// ----- uglify js ----- //

var uglify = require('gulp-uglify');

gulp.task( 'uglifyjs', function() {
  return gulp.src( [ 'dist/*.js', '!dist/*.min.js' ] )
  .pipe( uglify({
    preserveComments: 'license'
  }))
  .pipe( rename(function(path) {
    path.basename += '.min';
  }))
  .pipe( gulp.dest( 'dist' ) );
});

gulp.task( 'js', [ 'uglifyjs' ] );

// ----- web server ----- //

var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('.')
  .pipe(webserver({
    directoryListing: true,
    open: true,
    port: 7778
  }));
});

// ----- watch ----- //

gulp.task( 'watch', function() {
  gulp.watch( 'js/**/*.js', [ 'hint-js', 'browserify-babel' ]);
  gulp.watch( [ 'dist/*.js', '!dist/*.min.js' ], [ 'js' ] );
});

// ----- default ----- //

gulp.task( 'default', [
  'webserver',
  'hint',
  'browserify-babel',
  'watch'
]);
