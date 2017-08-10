// 引用外掛
var gulp = require('gulp'),
    // clean
    del = require('del'),
    // jade
    jade = require('gulp-jade'),
    // postCss
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sass = require('gulp-sass'),
    lost = require('lost'),
    rucksack = require('rucksack-css'),
    // 整個sass資料夾import
    bulkSass = require('gulp-sass-bulk-import'),
    // markdown
    markdown = require('gulp-markdown'),
    // ES6
    babel = require("gulp-babel"),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    // 編譯riot.js
    riot = require('gulp-riot'),
    // 壓縮css
    minifyCSS = require('gulp-minify-css'),
    // 重新命名min檔用
    rename = require("gulp-rename"),
    // 偵錯工具
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    // sourcemap
    sourcemaps = require('gulp-sourcemaps'),
    // bundle
    bundle = require('gulp-bundle-assets'),
    // webServer
    webServer = require('gulp-webserver');

// 路徑
var src_jade = './jade/*.jade',
    end_jade = './',
    src_sass = ['./assets/sass/**/*.sass', './assets/sass/**/*.scss'],
    end_Sass = './assets/css/',
    end_bundle = './assets/bundle/',
    src_mark = './*.md',
    end_mark = './',
    src_riot = './assets/riot/tag/*.tag',
    end_riot = './assets/riot/js/',
    src_es6js = './assets/es6/es6.js',
    end_es6js = './assets/js/';

// webServer網址
var serverSite = 'seansu.local';

// sass編譯css的排列
/*
	nested: 一般css，但尾巴在同一行
	expanded: 完整的css排列
	compact: 每一段變成一行
	compressed: 壓縮成一行
*/
var sassCompile = 'compact';

gulp.task('clean', function () {
  return del(['./assets/bundle/*']);
});

// jade
gulp.task('template', function() {
	return gulp.src(src_jade)
	.pipe(plumber({
		errorHandler: notify.onError("Error: <%= error.message %>")
	}))
	.pipe(jade({
		pretty: true
	}))
	.pipe(gulp.dest(end_jade))
	.pipe(notify({
		message: 'Jade Compily'
	}));
});


// 讓sass可以import css
gulp.task('css', function() {
	gulp.src('assets/vendor/**/*.css')
		.pipe(importCss())
		.pipe(gulp.dest(end_Sass));
});


// postCss
gulp.task('styles', function() {
	var processors = [
		lost,
		rucksack({
			fallbacks: true
		}),
		autoprefixer({
			browsers: ['last 4 version']
		})
	];
	return gulp.src(src_sass)
		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
		}))
		.pipe(sourcemaps.init())
		.pipe(bulkSass())
		.pipe(sass({
			outputStyle: sassCompile
		}).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(end_Sass));
});

// ES6
gulp.task('es6', function() {
  return browserify({
		// 要編譯哪些檔案
    entries: [src_es6js]
  })
    .transform(babelify.configure({
      presets : ['es2015']
    }))
    .bundle()
    // bundle 後的檔案名稱
		.pipe(source('es6.js'))
		// bundle 完的檔案要放哪
    .pipe(gulp.dest(end_es6js));
});

// 編譯riot.js
gulp.task('riot', function() {
	gulp.src(src_riot)
		.pipe(riot({
			compact: true
		}))
		.pipe(gulp.dest(end_riot));
});


// 合併、壓縮js檔案
gulp.task('bundle', function() {
	return gulp.src('./bundle.config.js')
		.pipe(bundle())
		/*
			想重新更名的話可以使用下列語法，但要記得 .js.map 的檔名要改
			.pipe(rename(function(path) {
				path.basename += "-multimedia.min";
				path.extname = ".js";
			}))
		*/
		.pipe(gulp.dest(end_bundle))
		.pipe(notify({
			message: 'Bundle Compily'
		}));
});


// markdown，需要時在拿掉註解
// gulp.task('markdown', function() {
//   return gulp.src(src_mark)
//     .pipe(plumber({
//       errorHandler: notify.onError("Error: <%= error.message %>")
//     }))
//     .pipe(markdown())
//     .pipe(gulp.dest(end_mark))
//     .pipe(notify({
//       message: 'Markdown Success'
//     }));
// });


// 監聽
gulp.task('watch', function() {
	// gulp.watch(['./assets/js/*.js', './assets/css/*.css'], ['clean']); // 每次都clean會花時間
	gulp.watch(src_jade, ['template']);
	gulp.watch(src_sass, ['styles']);
	gulp.watch('./assets/es6/*.js', ['es6']);
	gulp.watch(src_riot, ['riot']);
	gulp.watch(['./bundle.config.js', './assets/js/*.js', './assets/css/*.css'], ['bundle']);
	// gulp.watch(src_mark, ['markdown']);
});


// server
gulp.task('webServer', function() {
	gulp.src('./')
		.pipe(webServer({
			host: serverSite,
			fallback: 'index.html',
			livereload: true
		}));
});


// cmd輸入"gulp"時，要執行的task
gulp.task('default', ['clean', 'template', 'styles', 'es6', 'riot', 'bundle', 'webServer', 'watch']);