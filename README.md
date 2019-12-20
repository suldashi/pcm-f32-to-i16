# pcm-f32-to-i16

This module provides a Transform (read/write) stream for converting headerless PCM
files from 32-bit Floating point format (-1.0 to 1.0) into 16-bit signed integer
(-32768 to 32767). The incoming stream should be little-endian, and the outgoing
stream is little-endian as well.

The purpose of this package is to act as a intermediate step for libraries that
don't accept float PCM data, such as `node-opus`. 


Installation
------------

`pcm-f32-to-i16` has no dependencies other than the native Node `stream.Transform`.

Simply install `pcm-f32-to-i16` using `npm`:

``` bash
$ npm install pcm-f32-to-i16
```


Example
-------

Here's an example of using the `PCMf32toi16` class, in which we pipe the stream
from a raw 32-bit float PCM file. This stream is converted piece by piece into a
raw 16-bit signed integer PCM file.

``` javascript
let fs = require("fs");
let PCMf32toi16 = require("pcm-f32-to-i16");

let inputFile = fs.createReadStream("sine.raw");
let outputFile = fs.createWriteStream("sineint.raw");
let floatToInt = new PCMf32toi16();
inputFile.pipe(floatToInt).pipe(outputFile);
```

If you examine the waveforms of both files using a program such as Audacity, the
differences will be imperceptibly small.

License: MIT