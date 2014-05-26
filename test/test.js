/*jshint node: true */
'use strict';

var fs = require('fs');
var htify = require('../index.js');
var browserify = require('browserify');
var logger = require('log4js').getLogger('htify-test');
var crypto = require('crypto');
var events = require('events');

function getSha1(data) {
    return crypto.createHash('sha1').update(data).digest('hex');
}

function assertSha1AreEquals(test, outputFilePath, expected) {
    logger.debug('assertSha1AreEquals the sha1 of: ' + outputFilePath + ', to be: ' + expected);

    fs.readFile(outputFilePath, function (err, data) {
        logger.debug('PROUTTT');
        var actual = getSha1(data);
        logger.debug('actual: ' + actual);
        test.equal(actual, expected, 'Sha1 should be equal');
        assert.equal(actual, expected, 'Sha1 should be equal');
    });
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
    logger.debug('generateHtifiedFile in directory: ' + parsedDirectoryPath + ', to the output: ' + outputFilePath);

    // use console output if there is no specified output file path
    var writeFileStream = process.output;
    if (outputFilePath) {
        writeFileStream = fs.createWriteStream(outputFilePath);
    }

    // create a builder with default js file to browserify
    var builder = getBuilder(parsedDirectoryPath);

    builder.transform(htify).bundle()
        .on('error', handle).pipe(writeFileStream).on('finish', function () {
            logger.debug('On finish!');
        });

    writeFileStream.end('ENDED');

    writeFileStream.on('finish', function () {
        logger.debug('On finish!');
    });
}

exports.testDirectoryWithoutHeader = function (test) {
    var expected = 'da39a3ee5e6b4b0d3255bfef95601890afd80709';
    var parsedDirectoryPath = './test/withoutHeader';
    var outputFilePath = './test/megaResult.txt';

    test.expect(1);


    generateHtifiedFile(parsedDirectoryPath, outputFilePath);

    assertSha1AreEquals(test, outputFilePath, expected);

    test.done();
};