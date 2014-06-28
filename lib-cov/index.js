
// instrument by jscoverage, do not modifly this file
(function (file, lines, conds, source) {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (BASE._$jscoverage) {
    BASE._$jscmd(file, 'init', lines, conds, source);
    return;
  }
  var cov = {};
  /**
   * jsc(file, 'init', lines, condtions)
   * jsc(file, 'line', lineNum)
   * jsc(file, 'cond', lineNum, expr, start, offset)
   */
  function jscmd(file, type, line, express, start, offset) {
    var storage;
    switch (type) {
      case 'init':
        if(cov[file]){
          storage = cov[file];
        } else {
          storage = [];
          for (var i = 0; i < line.length; i ++) {
            storage[line[i]] = 0;
          }
          var condition = express;
          var source = start;
          storage.condition = condition;
          storage.source = source;
        }
        cov[file] = storage;
        break;
      case 'line':
        storage = cov[file];
        storage[line] ++;
        break;
      case 'cond':
        storage = cov[file];
        storage.condition[line] ++;
        return express;
    }
  }
  
  BASE._$jscoverage = cov;
  BASE._$jscmd = jscmd;
  jscmd(file, 'init', lines, conds, source);
})('lib/index.js', [2,3,4,5,6,7,10,11,12,13,15,16,18,21,25,26,27,31,33,40,36,37,44,46,47,57,50,51,53,54,66,67,62,64], {"13_28_9":0,"25_37_10":0,"27_15_41":0,"27_59_6":0,"27_15_30":0,"27_30_15":0,"35_12_16":0,"35_32_18":0,"35_12_7":0,"35_32_14":0,"37_21_31":0,"37_56_52":0,"37_21_17":0,"37_43_9":0,"37_56_33":0,"37_94_14":0,"37_70_6":0,"46_65_9":0,"46_77_13":0,"50_24_35":0,"50_62_18":0,"50_24_24":0,"50_40_8":0,"51_49_9":0,"51_61_13":0,"53_24_35":0,"53_62_17":0,"53_24_24":0,"53_40_8":0,"64_66_8":0}, ["/*jshint node: true */","'use strict';","var through = require('through');","var path = require('path');","var fs = require('fs');","var log4js = require('log4js');","var logger = log4js.getLogger('htify');","","","module.exports = function htify(filename) {","    var separator = '_';","    var validExtension = '.js';","    var defaultHeaderName = separator + 'default.js';","","    var source = '';","    var stream = through(write, end);","","    return stream;","","    function write(buf) {","        source += buf;","    }","","    function addHeaderDependency(source, headerName) {","        var localHeaderPath = './' + headerName;","        var requireFileName = localHeaderPath.replace('.js', '');","        return 'require(\\\"' + requireFileName + '\\\");\\n' + source;","    }","","    function isHtifyable(srcPath) {","        var srcName = path.basename(srcPath);","","        var result = false;","","        if (srcName !== null && srcName.length > 2) {","            var length = srcName.length;","            result = srcName.charAt(0) !== separator && srcName.slice(length - 3, length) === validExtension;","        }","","        return result;","    }","","    function compile(source) {","        var srcHeaderName = path.basename(filename);","","        var specificHeaderPath = filename.replace(srcHeaderName, separator + srcHeaderName);","        var defaultHeaderPath = filename.replace(srcHeaderName, defaultHeaderName);","","        if (fs.existsSync(specificHeaderPath)) {","            logger.info('Associated ' + filename + ' with ' + specificHeaderPath);","            source = addHeaderDependency(source, separator + srcHeaderName);","        } else if (fs.existsSync(defaultHeaderPath)) {","            logger.info('Associated ' + filename + ' with ' + defaultHeaderPath);","            source = addHeaderDependency(source, defaultHeaderName);","        }","","        return source;","    }","","    function end() {","        if (isHtifyable(filename)) {","            source = compile(source);","        } else {","            logger.info('Htify cannot be applied to the file: ' + filename);","        }","        this.queue(source);","        this.queue(null);","    }","};"]);
/*jshint node: true */
_$jscmd("lib/index.js", "line", 2);

"use strict";

_$jscmd("lib/index.js", "line", 3);

var through = require("through");

_$jscmd("lib/index.js", "line", 4);

var path = require("path");

_$jscmd("lib/index.js", "line", 5);

var fs = require("fs");

_$jscmd("lib/index.js", "line", 6);

var log4js = require("log4js");

_$jscmd("lib/index.js", "line", 7);

var logger = log4js.getLogger("htify");

_$jscmd("lib/index.js", "line", 10);

module.exports = function htify(filename) {
    _$jscmd("lib/index.js", "line", 11);
    var separator = "_";
    _$jscmd("lib/index.js", "line", 12);
    var validExtension = ".js";
    _$jscmd("lib/index.js", "line", 13);
    var defaultHeaderName = _$jscmd("lib/index.js", "cond", "13_28_9", separator) + "default.js";
    _$jscmd("lib/index.js", "line", 15);
    var source = "";
    _$jscmd("lib/index.js", "line", 16);
    var stream = through(write, end);
    _$jscmd("lib/index.js", "line", 18);
    return stream;
    function write(buf) {
        _$jscmd("lib/index.js", "line", 21);
        source += buf;
    }
    function addHeaderDependency(source, headerName) {
        _$jscmd("lib/index.js", "line", 25);
        var localHeaderPath = "./" + _$jscmd("lib/index.js", "cond", "25_37_10", headerName);
        _$jscmd("lib/index.js", "line", 26);
        var requireFileName = localHeaderPath.replace(".js", "");
        _$jscmd("lib/index.js", "line", 27);
        return _$jscmd("lib/index.js", "cond", "27_15_41", _$jscmd("lib/index.js", "cond", "27_15_30", 'require("' + _$jscmd("lib/index.js", "cond", "27_30_15", requireFileName)) + '");\n') + _$jscmd("lib/index.js", "cond", "27_59_6", source);
    }
    function isHtifyable(srcPath) {
        _$jscmd("lib/index.js", "line", 31);
        var srcName = path.basename(srcPath);
        _$jscmd("lib/index.js", "line", 33);
        var result = false;
        if (_$jscmd("lib/index.js", "cond", "35_12_16", _$jscmd("lib/index.js", "cond", "35_12_7", srcName) !== null) && _$jscmd("lib/index.js", "cond", "35_32_18", _$jscmd("lib/index.js", "cond", "35_32_14", srcName.length) > 2)) {
            _$jscmd("lib/index.js", "line", 36);
            var length = srcName.length;
            _$jscmd("lib/index.js", "line", 37);
            result = _$jscmd("lib/index.js", "cond", "37_21_31", _$jscmd("lib/index.js", "cond", "37_21_17", srcName.charAt(0)) !== _$jscmd("lib/index.js", "cond", "37_43_9", separator)) && _$jscmd("lib/index.js", "cond", "37_56_52", _$jscmd("lib/index.js", "cond", "37_56_33", srcName.slice(_$jscmd("lib/index.js", "cond", "37_70_6", length) - 3, length)) === _$jscmd("lib/index.js", "cond", "37_94_14", validExtension));
        }
        _$jscmd("lib/index.js", "line", 40);
        return result;
    }
    function compile(source) {
        _$jscmd("lib/index.js", "line", 44);
        var srcHeaderName = path.basename(filename);
        _$jscmd("lib/index.js", "line", 46);
        var specificHeaderPath = filename.replace(srcHeaderName, _$jscmd("lib/index.js", "cond", "46_65_9", separator) + _$jscmd("lib/index.js", "cond", "46_77_13", srcHeaderName));
        _$jscmd("lib/index.js", "line", 47);
        var defaultHeaderPath = filename.replace(srcHeaderName, defaultHeaderName);
        if (fs.existsSync(specificHeaderPath)) {
            _$jscmd("lib/index.js", "line", 50);
            logger.info(_$jscmd("lib/index.js", "cond", "50_24_35", _$jscmd("lib/index.js", "cond", "50_24_24", "Associated " + _$jscmd("lib/index.js", "cond", "50_40_8", filename)) + " with ") + _$jscmd("lib/index.js", "cond", "50_62_18", specificHeaderPath));
            _$jscmd("lib/index.js", "line", 51);
            source = addHeaderDependency(source, _$jscmd("lib/index.js", "cond", "51_49_9", separator) + _$jscmd("lib/index.js", "cond", "51_61_13", srcHeaderName));
        } else if (fs.existsSync(defaultHeaderPath)) {
            _$jscmd("lib/index.js", "line", 53);
            logger.info(_$jscmd("lib/index.js", "cond", "53_24_35", _$jscmd("lib/index.js", "cond", "53_24_24", "Associated " + _$jscmd("lib/index.js", "cond", "53_40_8", filename)) + " with ") + _$jscmd("lib/index.js", "cond", "53_62_17", defaultHeaderPath));
            _$jscmd("lib/index.js", "line", 54);
            source = addHeaderDependency(source, defaultHeaderName);
        }
        _$jscmd("lib/index.js", "line", 57);
        return source;
    }
    function end() {
        if (isHtifyable(filename)) {
            _$jscmd("lib/index.js", "line", 62);
            source = compile(source);
        } else {
            _$jscmd("lib/index.js", "line", 64);
            logger.info("Htify cannot be applied to the file: " + _$jscmd("lib/index.js", "cond", "64_66_8", filename));
        }
        _$jscmd("lib/index.js", "line", 66);
        this.queue(source);
        _$jscmd("lib/index.js", "line", 67);
        this.queue(null);
    }
};