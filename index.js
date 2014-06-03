'use strict';

var SimpleTemplate = require('./lib/simple-template'),
    through = require('through2'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    path = require("path");


function substitute(str, o, regexp) {
    if (typeof str != 'string' || !o) {
        return str;
    }

    return str.replace(regexp || /\\?\{([^{}]+)\}/g, function (match, name) {
        if (match.charAt(0) === '\\') {
            return match.slice(1);
        }
        return (o[name] === undefined) ? '' : o[name];
    });
}

var kissy =  fs.readFileSync(path.join(__dirname,"kissy.tpl")).toString();

module.exports = function (options, settings) {
    settings = settings || {};
    options = options || {};
    settings.ext = typeof settings.ext === "undefined" ? ".html" : settings.ext;

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit(
                'error',
                new gutil.PluginError('gulp-html2kissy', 'Streaming not supported')
            );
        }
        var modname = path.basename(file.path).replace(path.extname(file.path),'');

        try {
            var tpl = SimpleTemplate({
                left: options.left,
                right: options.right,
                tpl: file.contents.toString()
            });

            var fun = tpl.compile().toString();

            file.contents = new Buffer(substitute(kissy,{
                package: path.join(options.package,modname),
                lines: JSON.stringify(tpl.__lines),
                render: fun
            }));
            file.path = gutil.replaceExtension(file.path, ".js");
        } catch (err) {
            console.log(file.path);
            this.emit('error', new gutil.PluginError('gulp-html2kissy', err.toString()));
        }

        this.push(file);
        cb();
    });
};
