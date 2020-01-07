CryptoGen = {
    get: function() {
        var entropy = new Uint8Array(1)

        var rng = window.crypto || window.msCrypto
        rng.getRandomValues(entropy)

        return entropy[0] & 0xff
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