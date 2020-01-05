CryptoByte = {
    get: function() {
        var entropy = new Uint8Array(256)

        var rng = window.crypto || window.msCrypto
        rng.getRandomValues(entropy)

        var result = 0x00
        for(const i of entropy) {
            result ^= entropy
            result &= 0xff
        }

        return result & 0xff
    },

    getBelow: function(max) {
        if(max <= 0 || max > 255) throw "Invalid Input [0 <= max <= 255]"
        var result = max;
        do { result = this.get() } while(result >= max);
        return result
    },

    getRange: function(min, max) {
        if(max < min) throw "Invalid Input [min > max]"
        return (min + this.getBelow(max - min))
    }
}