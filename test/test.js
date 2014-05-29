/*jshint node: true */
'use strict';

var fs = require('fs');
var htify = require('../index.js');
var browserify = require('browserify');
var logger = require('log4js').getLogger('htify-test');

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
function generateHtifiedFile(parsedDirectoryPath, outputFilePath, callback) {
    // use console output if there is no specified output file path
    var writeFileStream = process.output;
    try {
        if (outputFilePath) {
            writeFileStream = fs.createWriteStream(outputFilePath);
        }

        // create a builder with default js file to browserify
        var builder = getBuilder(parsedDirectoryPath);

        builder.transform(htify).bundle()
            .on('error', handle).pipe(writeFileStream).on('finish', function () {
                if (callback) {
                    callback();
                }
            });
    } catch (error) {
        logger.error('Cannot htify: ' + error);
    }

}

//Call the callback method with the file content as a string parameter
function getFileDataAsString(filePath, callback) {
    try {
        var r = fs.createReadStream(filePath);
        r.on('readable', function () {
            var chunk;
            var str = '';
            while (null !== (chunk = r.read())) {
                str += chunk.toString();
            }
            if (callback) {
                callback(str);
            }
        });
    } catch (error) {
        logger.error('Cannot get file data: ' + error);
    }

}

function testHtifiedFile(referenceFilePath, targetDir, actualFilePath) {
    // first step, get the expected file content as string
    getFileDataAsString(referenceFilePath, function (expectedContent) {
        // next, apply htify
        generateHtifiedFile(targetDir, actualFilePath, function () {
            // htify is applied, get its content to compare with the expected one
            getFileDataAsString(actualFilePath, function (actualContent) {
                // remove the generated file, we don't need it anymore
                fs.unlink(actualFilePath);
                // remove \n\r to avoid issue between Window and Linux
                process.test.equal(expectedContent.replace(/[\n\r]/g, ''), actualContent.replace(/[\n\r]/g, ''), 'File content should be equal');
                process.exit();
            });
        });
    });
}

exports.testDirectoryWithoutHeader = function (test) {
    test.expect(1);
    var referenceFilePath = './test/references/withoutHeaderResult.js';
    var targetDir = './test/withoutHeader/';
    var actualFilePath = './test/withoutHeaderResult.js';
    process.test = test;
    process.exit = test.done;

    testHtifiedFile(referenceFilePath, targetDir, actualFilePath);
};

exports.testDirectoryWithOnlyADefaultHeader = function (test) {
    test.expect(1);
    var referenceFilePath = './test/references/onlyADefaultHeaderResult.js';
    var targetDir = './test/onlyADefaultHeader/';
    var actualFilePath = './test/onlyADefaultHeaderResult.js';
    process.test = test;
    process.exit = test.done;

    testHtifiedFile(referenceFilePath, targetDir, actualFilePath);
};

exports.testDirectoryWithOnlyASpecificHeader = function (test) {
    test.expect(1);
    var referenceFilePath = './test/references/onlySpecificHeaderResult.js';
    var targetDir = './test/onlySpecificHeader/';
    var actualFilePath = './test/onlySpecificHeaderResult.js';
    process.test = test;
    process.exit = test.done;

    testHtifiedFile(referenceFilePath, targetDir, actualFilePath);
};