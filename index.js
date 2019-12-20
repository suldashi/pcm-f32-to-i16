const { Transform  } = require('stream');

class PCMf32toi16 extends Transform  {

    /*
        The outgoing buffer is half the size of the incoming one, since each sample
        is 16 bits, as opposed to the 32 bits of the input. The multiplication of
        the sample by 2^15 scales the float value to the integer value in the correct
        range. Buffer.writeInt16LE ensures the conversion into the proper 16-bit
        little-endian format.
    */
    _transform(chunk, encoding, done) {
        let buf = Buffer.alloc(chunk.length/2);
        for(var i=0;i<chunk.length;i+=4) {  //we iterate 4 bytes at a time (32 bits)
            buf.writeInt16LE(chunk.readFloatLE(i)*0x7FFF, i/2);
        }
        this.push(buf);
        done();
    }
}

module.exports = PCMf32toi16;