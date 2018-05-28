export function toBinary(n, bits = 8) {
    let bin = ((n & fillOnes(bits)) >>> 0).toString(2);
    const remLen = bits > bin.length ? bits - bin.length + 1 : 0;
    bin = Array(remLen).join('0') + bin;
    if (bin.length > bits && bin.length === 32)
        bin = bin.substr(32 - bits);

    // return bin.split('').reverse().join('').replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/, '').split('').reverse('').join(''); // split in 4 bits
    return bin;
}

export function getLastBits(n, bits) {
    return n & ((1 << bits) - 1);
}

export function consoleBinaryPrint(...group) {
    let a = [];
    for (let item of group) {
        a.push(toBinary(item[0], item[1]));
    }
    console.log(...a);
}

export function findDigitsQuotient(b, p) {
    const table = [
        { b: 8, pRange: [-12, -7], q: -2 },
        { b: 8, pRange: [-6, -3], q: -1 },
        { b: 8, pRange: [-2, 1], q: 0 },
        { b: 8, pRange: [2, 5], q: 1 },
        { b: 8, pRange: [6, 11], q: 2 },

        { b: 9, pRange: [-14, -8], q: -2 },
        { b: 9, pRange: [-7, -3], q: -1 },
        { b: 9, pRange: [-3, 2], q: 0 },
        { b: 9, pRange: [2, 6], q: 1 },
        { b: 9, pRange: [7, 13], q: 2 },

        { b: 10, pRange: [-15, -9], q: -2 },
        { b: 10, pRange: [-8, -3], q: -1 },
        { b: 10, pRange: [-3, 2], q: 0 },
        { b: 10, pRange: [2, 7], q: 1 },
        { b: 10, pRange: [8, 14], q: 2 },

        { b: 11, pRange: [-16, -9], q: -2 },
        { b: 11, pRange: [-9, -3], q: -1 },
        { b: 11, pRange: [-3, 2], q: 0 },
        { b: 11, pRange: [2, 8], q: 1 },
        { b: 11, pRange: [8, 15], q: 2 },

        { b: 12, pRange: [-18, -10], q: -2 },
        { b: 12, pRange: [-10, -4], q: -1 },
        { b: 12, pRange: [-4, 3], q: 0 },
        { b: 12, pRange: [3, 9], q: 1 },
        { b: 12, pRange: [9, 17], q: 2 },

        { b: 13, pRange: [-19, -11], q: -2 },
        { b: 13, pRange: [-10, -4], q: -1 },
        { b: 13, pRange: [-4, 3], q: 0 },
        { b: 13, pRange: [3, 9], q: 1 },
        { b: 13, pRange: [10, 18], q: 2 },

        { b: 14, pRange: [-20, -11], q: -2 },
        { b: 14, pRange: [-11, -4], q: -1 },
        { b: 14, pRange: [-4, 3], q: 0 },
        { b: 14, pRange: [3, 10], q: 1 },
        { b: 14, pRange: [10, 19], q: 2 },

        { b: 15, pRange: [-22, -12], q: -2 },
        { b: 15, pRange: [-12, -4], q: -1 },
        { b: 15, pRange: [-5, 4], q: 0 },
        { b: 15, pRange: [3, 11], q: 1 },
        { b: 15, pRange: [11, 21], q: 2 },
    ];

    const correctEntries = table.
        filter((row) => row.b === b && (p >= row.pRange[0] && p <= row.pRange[1]))
        .sort((rowa, rowb) => Math.abs(rowa.q) - Math.abs(rowb.q));

    let possibleQ = correctEntries[0].q;
    if (correctEntries.length > 0) {
        correctEntries.forEach((entry) => {
            if (entry.q == 0) {
                possibleQ = 0;
            }
        })
    }

    return possibleQ;
}

export function fillOnes(bits) {
    return (1 << bits) - 1;
}