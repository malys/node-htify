/*jshint node: true */
'use strict';

var fs = require('fs');
var htify = require('../index.js');
var browserify = require('browserify');
var logger = require('log4js').getLogger('htify-test');
var crypto = require('crypto');

function getSha1(data) {
    return crypto.createHash('sha1').update(data).digest('hex');
}

function getActualSha1(parsedDirectoryPath, outputFilePath) {
    generateHtifiedFile(parsedDirectoryPath, outputFilePath);

    var targetFileContent = fs.readFileSync(outputFilePath);
    return getSha1(targetFileContent);
}

function getBuilder(parsedDirectoryPath) {
    return browserify({
        entries: [
            parsedDirectoryPath + '/add.js',
            parsedDirectoryPath + '/substract.js'
        ],
        debug: true
    });
}

function handle(error) {
    logger.debug('Handle error');
    throw error;
}

// Generate a file with the specified path using Browserify and the htify transformation
function generateHtifiedFile(parsedDirectoryPath, outputFilePath) {
    // use console output if there is no specified output file path
    var writeFileStream = process.output;
    if (outputFilePath) {
        writeFileStream = fs.createWriteStream(outputFilePath);
    }

    // create a builder with default js file to browserify
    var builder = getBuilder(parsedDirectoryPath);
    builder.transform(htify).bundle()
        .on('error', handle).pipe(writeFileStream);
    writeFileStream.end();
}

exports.testDirectoryWithoutHeader = function (test) {
    test.expect(1);
    var parsedDirectoryPath = './test/withoutHeader';
    var outputFilePath = './test/directoryWithoutHeaderResult.txt';

    // expected sha1 generated with a valid generated file
    var expected = 'da39a3ee5e6b4b0d3255bfef95601890afd80709';
    var actual = getActualSha1(parsedDirectoryPath, outputFilePath);

    test.equal(actual, expected, 'Sha1 should be equal');

    test.done();
};