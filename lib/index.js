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
            shName = './' + sep + shName;

            var pathTest = filename.replace(path.basename(filename), '_' + path.basename(filename));
            if (fs.existsSync(pathTest)) {
                var requireFileName = shName.replace('.js', '');
                source = 'require(\"' + requireFileName + '\");\n' + source;
            }
            this.queue(source);
            this.queue(null);
        }

        return through(read, end);
    };
};