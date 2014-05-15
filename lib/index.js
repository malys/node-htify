'use strict'
var through = require('through');
var path = require('path');
var fs = require('fs');


module.exports = function (options) {
    options = options || {};

    return function (filename) {
        console.log(filename);
        var source = '';

        function read(chunk) {
            source += chunk;
        }

        function end() {
            var sep = '_';
            var shName = path.basename(filename);
            var requireFileName;
            var defaultJS = 'default.js';

            var pathTest = filename.replace(path.basename(filename), sep + path.basename(filename));
            var defaultPathTest = filename.replace(path.basename(filename), sep + defaultJS);
            if (fs.existsSync(pathTest)) {
                shName = './' + sep + shName;
                requireFileName = shName.replace('.js', '');
                source = 'require(\"' + requireFileName + '\");\n' + source;
            } else if (fs.existsSync(defaultPathTest)) {
                shName = './' + sep + defaultJS;
                requireFileName = shName.replace('.js', '');
                source = 'require(\"' + requireFileName + '\");\n' + source;
            }
            this.queue(source);
            this.queue(null);
        }

        return through(read, end);
    };
};