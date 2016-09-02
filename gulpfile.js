var gulp = require('gulp');
var rename = require('gulp-rename');
var rimraf = require('gulp-rimraf');

var filename = 'imlazy.pkgd';





gulp.task('clean:js', function() {
  return gulp.src( [ 'bin/*.js', 'bin/*.js.map' ], {
      read: false
  })
  .pipe( rimraf() );
});


// ----- jshint ----- //
var jshint = require('gulp-jshint');

gulp.task( 'jshint', [ 'clean:js' ], function() {
  return gulp.src( [ 'app/index.js' ] )
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .on( 'error', function(err) {
    console.log(err.toString());
    this.emit('end');
  })
  .pipe( rename(function(path) {
    path.basename = filename;
  }))
  .pipe( gulp.dest( 'bin' ) )
});




// ----- uglify js ----- //
var uglify = require('gulp-uglify');

gulp.task( 'uglifyjs', [ 'jshint' ], function() {
  return gulp.src( [ 'bin/*.js' ] )
  .pipe( uglify({
    preserveComments: 'license'
  }))
  .pipe( rename(function(path) {
    path.basename += '.min';
  }))
  .pipe( gulp.dest( 'bin' ) );
});

// ----- JS ----- //
gulp.task( 'js', [ 'uglifyjs' ] );





// ----- watch ----- //
gulp.task( 'watch', function() {
  gulp.watch( 'app/**/*.js', [ 'js' ] );
});


// ----- default ----- //
gulp.task( 'default', [
  'js',
  'watch'
]);
