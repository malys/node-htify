(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    add: function (a, b) {
        return a + b
    },
    sub: function (a, b) {
        return a - b;
    }
};
},{}],2:[function(require,module,exports){
var myAdd = require('../lib/myMath.js').add;
},{"../lib/myMath.js":1}],3:[function(require,module,exports){
require("./_add");
function add(a, b) {
    return myAdd(a, b);
}
},{"./_add":2}],4:[function(require,module,exports){
function sub(a, b) {
    return myMath.sub(a, b);
}
},{}]},{},[3,4])