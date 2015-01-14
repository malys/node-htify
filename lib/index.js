/*jshint node: true */
'use strict';
var through = require('through');
var path = require('path');
var fs = require('fs');

module.exports = function htify(filename) {
    var separator = '_';
    var validExtension = '.js';
    var defaultHeaderName = separator + 'default.js';

    var source = '';
    var stream = through(write, end);

    return stream;

    function write(buf) {
        source += buf;
    }

    function addHeaderDependency(source, h) {
        return h + ';\n' + source;
    }

    function isHtifyable(srcPath) {
        var srcName = path.basename(srcPath);

        var result = false;

        if (srcName !== null && srcName.length > 2) {
            var length = srcName.length;
            result = srcName.charAt(0) !== separator && srcName.slice(length - 3, length) === validExtension;
        }

        return result;
    }

    function compile(source) {
        var srcHeaderName = path.basename(filename);

        var specificHeaderPath = filename.replace(srcHeaderName, separator + srcHeaderName);
        var defaultHeaderPath = filename.replace(srcHeaderName, defaultHeaderName);

        var h;

        try {
            h = fs.readFileSync(specificHeaderPath);
        } catch (err) {
            try {
                h = fs.readFileSync(defaultHeaderPath);
            } catch (err) {}
        }
        
        if (h) {
            source = addHeaderDependency(source, h);
        }
        
        return source;
    }

    function end() {
        if (isHtifyable(filename)) {
            source = compile(source);
        }
        this.queue(source);
        this.queue(null);
    }
};