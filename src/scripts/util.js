export function toBinary(n, bits = 8) {
    let bin = ((n & ((1 << bits) - 1)) >>> 0).toString(2);
    const remLen = bits > bin.length ? bits - bin.length + 1 : 0;
    bin = Array(remLen).join('0') + bin;
    if (bin.length > bits && bin.length === 32)
        bin = bin.substr(32 - bits);
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


export function fillOnes(bits) {
    return (1 << bits) - 1;
}