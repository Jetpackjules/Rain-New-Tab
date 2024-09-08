var gulp = require('gulp'),
  fs = require('fs'),
  source = require('vinyl-source-stream'),
  browserify = require('browserify'),
  uglify = require('gulp-uglify'),
  streamify = require('gulp-streamify'),
  babelify = require("babelify"),
  gsap = require('gsap/dist/gsap'),
  glslify = require("glslify"),
  postcss = require('gulp-postcss'),
  tailwindcss = require('tailwindcss'),
  autoprefixer = require('autoprefixer'),
  path = require('path');

function compileJS(file){
  browserify('src/'+file+'.js',{debug:true})
    .transform(babelify, {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-runtime']
    })
    .transform('glslify')
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source(file+'.min.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('rainyExtension/js'));
}

// New task to count image pairs and generate config
gulp.task('generate-config', function(done) {
  const rotationPath = path.join(__dirname, 'rainyExtension', 'img', 'rotation');
  fs.readdir(rotationPath, (err, files) => {
    if (err) {
      console.error('Error reading rotation folder:', err);
      done(err);
      return;
    }
    const imagePairs = files.filter(file => file.endsWith('-fg.png')).length;
    const config = {
      imagePairCount: imagePairs
    };
    fs.writeFile(
      path.join(__dirname, 'src', 'config.json'),
      JSON.stringify(config, null, 2),
      (err) => {
        if (err) {
          console.error('Error writing config file:', err);
          done(err);
          return;
        }
        console.log('Config file generated successfully');
        done();
      }
    );
  });
});

// Gulp task to process Tailwind CSS
gulp.task('css', function () {
  return gulp.src('src/tailwind.css')
    .pipe(postcss([
      tailwindcss,
      autoprefixer
    ]))
    .pipe(gulp.dest('rainyExtension/css'));
});


gulp.task('default',['js1','js2','js3','js-settings','css','generate-config'],function(){});
gulp.task('js1',function(){
  compileJS('index');
});
gulp.task('js2',function(){
  compileJS('index2');
});
gulp.task('js3',function(){
  compileJS('index3');
});
gulp.task('js-settings',function(){
  compileJS('settings');
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.css', ['css']);
  gulp.watch('src/**/*.js', ['js1', 'js2', 'js3', 'js-settings']);
  gulp.watch('rainyExtension/img/rotation/*', gulp.series('generate-config'));
});