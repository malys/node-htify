/*jshint node: true */
'use strict';
var through = require('through');
var path = require('path');
var fs = require('fs');
var log4js = require('log4js');
var logger = log4js.getLogger('htify');


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

    function addHeaderDependency(source, headerName) {
        var localHeaderPath = './' + headerName;
        var requireFileName = localHeaderPath.replace('.js', '');
        return 'require(\"' + requireFileName + '\");\n' + source;
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

        if (fs.existsSync(specificHeaderPath)) {
            logger.info('Associated ' + filename + ' with ' + specificHeaderPath);
            source = addHeaderDependency(source, separator + srcHeaderName);
        } else if (fs.existsSync(defaultHeaderPath)) {
            logger.info('Associated ' + filename + ' with ' + defaultHeaderPath);
            source = addHeaderDependency(source, defaultHeaderName);
        } else {
            logger.info('No configuration file found for ' + filename);
        }

        return source;
    }

    function end() {
        if (isHtifyable(filename)) {
            source = compile(source);
        } else {
            logger.info('Htify cannot be applied to the file: ' + filename);
        }
        this.queue(source);
        this.queue(null);
    }
};