'use strict'

var htify = require('../lib');
var browserify = require('browserify');

var builder = browserify({
    entries: [
        './opt/test/index.js',
        './test/index.js',
        './test/toto.js'
    ],
    debug: true
});

var transform = htify();

builder.transform(transform).bundle()
    .on('error', handle).pipe(process.stdout);
/*
builder.bundle()
    .on('error', handle).pipe(process.stdout);
*/
function handle(error) {
    throw error;
}