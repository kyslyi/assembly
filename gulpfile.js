const gulp = require('gulp');
const server = require('browser-sync').create();
const image_min = require('gulp-image');
const rm = require('gulp-rm');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const changed = require('gulp-changed');
const uglifyJs = require('gulp-uglify');
const path = require('path');
const concat = require('gulp-concat');

const sass_glob = require('gulp-sass-glob');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const short = require('postcss-short');
const svginline = require('postcss-inline-svg');
const sorting = require('postcss-sorting');
const pseudoel = require('postcss-pseudoelements');
const flexbugs = require('postcss-flexbugs-fixes');
const cssnano = require('cssnano');

const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');

const copy = ['copy:files', 'copy:fonts'];

gulp.task('clean:dist', function() {
  return gulp.src( 'dist/**/*', { read: false }).pipe( rm() );
});

gulp.task('copy:files', function() {
  return gulp.src('src/files/**/*.*').pipe(gulp.dest('dist/files'));
});

gulp.task('copy:fonts', function() {
  return gulp.src('src/fonts/*.{ttf,eot,woff,woff2}').pipe(gulp.dest('dist/fonts'));
});

function renderHtml(onlyChanged) {
  return gulp
    .src('src/pug/[^_]*.pug')
    .pipe(plumber({ errorHandler: require('./error') }))
    .pipe(gulpif(onlyChanged, changed('dist', { extension: '.html' })))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist'));
}

gulp.task('pug', function() {
  return renderHtml();
});

gulp.task('pug:changed', function() {
  return renderHtml(true);
});

gulp.task('image_min', function() {
  return gulp.src('./src/img/**/*')
    .pipe(image_min({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: false,
      concurrent: 10,
      quiet: true
    }))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('image:copy', function() {
  return gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('svg', () => {
   return gulp.src('src/svg/sprite/*.svg')
    .pipe(svgo({
       plugins: [
         {
           removeAttrs: {
             attrs: '(fill|stroke|opacity|style|width|height|data.*)'
           }
         }
       ]
     }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../sprite.svg'
        }
      }
    }))
   .pipe(gulp.dest('dist/img/')); 
});
  
gulp.task('server', function() {
  server.init({
    server: {
      baseDir: 'dist',
      directory: false,
      serveStaticOptions: {
        extensions: ['html']
      }
    },
    files: [
      'dist/*.html',
      'dist/css/*.css',
      'dist/js/*.js',
      'dist/img/**/*'
    ],
    port: 3000,
    logLevel: 'info',
    logConnections: false,
    logFileChanges: true,
    open: Boolean(true),
    notify: false,
    ghostMode: false,
    online: true,
    tunnel: null
  });
});

let processors = [
  short(),
  svginline(),
  autoprefixer({
    overrideBrowserslist: ['last 5 versions'],
    remove: true,
  }),
  sorting(),
  pseudoel(),
  flexbugs()
];

gulp.task('sass:app', function() {
  return gulp
    .src('src/sass/app.{sass,scss}')
    .pipe(sourcemaps.init())
    .pipe(sass_glob())
    .pipe(sass({
        outputStyle: 'nested', // nested, expanded, compact, compressed
        precision: 5,
        includePaths : 'src/sass'
    }))
    .on('error', require('./error'))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('sass:libs', function() {
  return gulp
    .src('src/sass/libs.{sass,scss}')
    .pipe(sass({
        outputStyle: 'compressed', // nested, expanded, compact, compressed
        precision: 5,
        includePaths : 'src/sass'
    }))
    .on('error', require('./error'))
    .pipe(gulp.dest('dist/css'))
});

gulp.task('js:vendor', function() {
  return gulp.src([
    path.resolve('node_modules', 'jquery/dist/jquery.min.js'),
    path.resolve('node_modules', 'svg4everybody/dist/svg4everybody.min.js'),
    path.resolve('node_modules', 'swiper/js/swiper.min.js'),
    path.resolve('node_modules', 'magnific-popup/dist/jquery.magnific-popup.min.js'),
    path.resolve('node_modules', 'jquery-mask-plugin/dist/jquery.mask.min.js'),
    // path.resolve('node_modules', 'jquery-selectric/src/jquery.selectric.js'),
    path.resolve('node_modules', 'jquery-lazy/jquery.lazy.min.js'),
    'src/js/libs/**/*.js'
     ])
    .pipe(concat('libs.js'))
    .pipe(uglifyJs())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('js:app', function() {
  return gulp.src([
      'src/js/app.js',
      'src/js/modules/*.js',
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function(){

  gulp.watch('src/files/**/*.*', gulp.series('copy:files'));
  gulp.watch('src/fonts/**/*.*', gulp.series('copy:fonts'));

  gulp.watch('src/pug/**/_*.pug', gulp.series('pug'));
  gulp.watch('src/pug/**/[^_]*.pug', gulp.series('pug:changed'));

  gulp.watch('src/sass/**/*.{sass,scss}', gulp.series('sass:app'));
  gulp.watch('src/sass/libs/*.{sass,scss}', gulp.series('sass:libs'));

  gulp.watch([
    'src/js/app.js',
    'src/js/modules/*.js'
  ], gulp.series('js:app'));

  gulp.watch('src/svg/sprite/*.svg', gulp.series('svg'));
  gulp.watch('src/img/**/*.*', gulp.series('image:copy'));

});

// npm run start image_min
// для минификации картинок

gulp.task('default', 
  gulp.series('clean:dist', 
    gulp.parallel(copy, 
      'pug', 
      'sass:app', 
      'sass:libs', 
      'js:vendor', 
      'js:app',
      'svg',
      'image:copy'), 
    gulp.parallel(
      'server', 
      'watch')))