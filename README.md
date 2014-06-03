# gulp-html2kissy 

> html2kissy plugin for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-html2kissy` as a development dependency:

```shell
npm install --save-dev gulp-ejs
```

Then, add it to your `gulpfile.js`:

```javascript
var html2kissy = require("gulp-html2kissy");

gulp.src("./templates/*.html")
	.pipe(html2kissy({
		package: "udata/views"
	}))
	.pipe(gulp.dest("./udata/views"));
```
If you want to use `gulp-html2kissy` in a watch/livereload task, you may want to avoid gulp exiting on error when, for instance, a partial file is `ENOENT`.
Here's an example on how to make it work:

```javascript
var html2kissy = require('gulp-html2kissy');
var gutil = require('gulp-util');

gulp.src('./templates/*.html')
	.pipe(html2kissy({
		package: "udata/views"
	}).on('error', gutil.log))
	.pipe(gulp.dest('./udata/views'));
```
This will make gulp log the error and continue normal execution.

## API

### html2kissy(options, settings)

#### options
Type: `hash`
Default: `{}`


#### settings
Type: `hash`
Default: `{ext: '.html'}`

A hash object to configure the plugin.

##### settings.ext
Type: `String`
Default: `.html`

Defines the default file extension that will be appended to the filename.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://www.npmjs.org/package/gulp-html2kissy
