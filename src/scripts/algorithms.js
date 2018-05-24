import { insertBoothRadix4Row, insertBoothRow } from './renderer';
import { getLastBits, toBinary, consoleBinaryPrint } from './util';

let runBoothRadix4 = function (M, Q, draw = true) {
    let A = 0;
    let COUNT = 0;
    let QNEG = 0;
    if (draw) {
        document.querySelector('#booth-radix4 tbody').innerHTML = '';
    }
    do {
        let QT = toBinary(((getLastBits(Q, 2)) << 1) + QNEG, 3);
        if (QT === '001' || QT === '010') {
            if (draw) {
                insertBoothRadix4Row(A, Q, QNEG, COUNT, "+M", M);
            }
            A += M;
        } else if (QT === '101' || QT === '110') {
            if (draw) {
                insertBoothRadix4Row(A, Q, QNEG, COUNT, "-M", M);
            }
            A -= M;
        } else if (QT === '011') {
            if (draw) {
                insertBoothRadix4Row(A, Q, QNEG, COUNT, "+2M", M);
            }
            A += 2 * M;
        } else if (QT === '100') {
            if (draw) {
                insertBoothRadix4Row(A, Q, QNEG, COUNT, "-2M", M);
            }
            A -= 2 * M;
        }
        let shiftAux = Number(getLastBits(A, 9)) << 8;
        shiftAux += getLastBits(Q, 8);
        shiftAux = shiftAux << 1;
        shiftAux += getLastBits(QNEG, 1);
        shiftAux = shiftAux >> 2;
        A = shiftAux >> 9;
        A = A | (((A >> 6) & 1)) << 7 | (((A >> 6) & 1)) << 8;
        Q = shiftAux >> 1 & ((1 << 8) - 1);
        QNEG = shiftAux & 1;

        if (draw) {
            insertBoothRadix4Row(A, Q, QNEG, COUNT, "SHIFT", M, true);
        }
    } while (COUNT++ < 3)
    if (A >> 8 === 1) {
        return (((1 << 17) - 1) << 17) + ((A << 8) + Q);

    } else {
        return ((A << 8) + Q);

    }
}

let runBooth = function (M, Q, draw = true) {
    let A = 0;
    let QNEG = 0;
    let COUNT = 0;
    if (draw) {
        document.querySelector('#booth tbody').innerHTML = '';
    }
    do {
        let QT = toBinary(((Q & 1) << 1) + QNEG, 2);
        if (QT === '10') {
            A -= M;
            if (draw) {
                insertBoothRow(A, Q, QNEG, COUNT, '-M', M);
            }
        } else if (QT === '01') {
            A += M;
            if (draw) {
                insertBoothRow(A, Q, QNEG, COUNT, '+M', M);
            }
        }

        let shiftAux = getLastBits(A, 8) << 8;
        shiftAux += getLastBits(Q, 8);
        shiftAux = shiftAux << 1;
        shiftAux += getLastBits(QNEG, 1);
        shiftAux = shiftAux >> 1;
        A = shiftAux >> 9;
        A = A | (((A >> 6) & 1)) << 7;
        Q = shiftAux >> 1 & ((1 << 8) - 1);
        QNEG = shiftAux & 1;
        if (draw) {
            insertBoothRow(A, Q, QNEG, COUNT, "SHIFT", M, true);
        }
    } while (COUNT++ < 7);
    if (A >> 7 === 1) {
        return (((1 << 16) - 1) << 16) + ((A << 8) + Q);

    } else {
        return ((A << 8) + Q);
    }
}


let runDivisionRestoring = function()
module.exports = {
    runBoothRadix4,
    runBooth
}