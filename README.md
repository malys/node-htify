# htify

[browserify](https://github.com/substack/browserify) transform.
Using htify, we can define 'require' definition in an external code file.

## Installation

Install with [npm(1)](http://npmjs.org):

    $ git clone git://github.com/malys/node-htify  
    $ npm install %cd%

## Examples
``
 test/tester.js
``
or

```
var htify = require('htify');

var builder = browserify({ entries: ['app.js'] });
var transform = htify();

builder.transform(transform).bundle().pipe(yourwritestream);
```

Then, if '_app.js' or '_default.js' exists, 'htify'' imports automatically this file.

```
_app.js
var bar = require('../../foo/bar');
var baz = require('../../foo/../baz');

app.js
// your code source
```

to:

```
var bar = require('../../foo/bar');
var baz = require('../../foo/../baz');

// your code source
```

With Grunt,

```
browserify: {
        src: ['XXXXXXXXX'],
        dest: 'YYYYYYY.js',
        options: {
            transform: ['htify']
        }  
}
```
Main motivation was to uncouple existed code source and Browserify framework.

## Credits

Thank you to [bodokaiser](https://github.com/bodokaiser/node-shortify)
to give me a good example of Browserify transformation.

## License

Copyright © 2014 Malys <malys@mageos.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
