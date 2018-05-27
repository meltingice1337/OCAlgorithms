import {
    insertBoothRadix4Row,
    insertBoothRow,
    insertDivisionRestoringRow,
    insertDivisionNonRestoringRow
} from './renderer';
import {
    getLastBits,
    toBinary,
    consoleBinaryPrint,
    fillOnes
} from './util';

export function runBoothRadix4(M, Q, draw = true, bits = 8) {
    let A = 0;
    let COUNT = 0;
    let QNEG = 0;
    if (draw) {
        document.querySelector('#booth-radix4 tbody').innerHTML = '';
        insertBoothRadix4Row(A, Q, QNEG, COUNT, 'initial', M, false, bits);
    }
    do {
        let QT = toBinary(((getLastBits(Q, 2)) << 1) + QNEG, 3);
        if (QT === '001' || QT === '010') {
            A += M;
            if (draw) {
                insertBoothRadix4Row(A, Q, QNEG, COUNT, "+M", M, false, bits);
            }
        } else if (QT === '101' || QT === '110') {
            A -= M;
            if (draw) {
                insertBoothRadix4Row(A, Q, QNEG, COUNT, "-M", M), false, bits;
            }
        } else if (QT === '011') {
            A += 2 * M;
            if (draw) {
                insertBoothRadix4Row(A, Q, QNEG, COUNT, "+2M", M, false, bits);
            }
        } else if (QT === '100') {
            A -= 2 * M;
            if (draw) {
                insertBoothRadix4Row(A, Q, QNEG, COUNT, "-2M", M, false, bits);
            }
        }
        let shiftAux = getLastBits(A, bits + 1) << bits;
        shiftAux += getLastBits(Q, bits);
        shiftAux = shiftAux << 1;
        shiftAux += getLastBits(QNEG, 1);
        shiftAux = shiftAux >> 2;
        A = shiftAux >> (bits + 1);
        A = A | (((A >> (bits - 2)) & 1)) << (bits - 1) | (((A >> (bits - 2)) & 1)) << bits;
        Q = shiftAux >> 1 & ((1 << bits) - 1);
        QNEG = shiftAux & 1;

        if (draw) {
            insertBoothRadix4Row(A, Q, QNEG, COUNT, "SHIFT right 2 pos", M, true, bits);
        }
    } while (COUNT++ < ((bits / 2) - 1))
    if (A >> bits === 1) {
        return (((1 << (bits * 2 + 1)) - 1) << (bits * 2 + 1)) + ((A << bits) + Q);

    } else {
        return ((A << bits) + Q);

    }
}

export function runBooth(Q, M, draw = true, bits = 8) {
    let A = 0;
    let QNEG = 0;
    let COUNT = 0;
    if (draw) {
        document.querySelector('#booth tbody').innerHTML = '';
        insertBoothRow(A, Q, QNEG, COUNT, 'initial', M, false, bits);
    }
    do {
        let QT = toBinary(((Q & 1) << 1) + QNEG, 2);
        if (QT === '10') {
            A -= M;
            if (draw) {
                insertBoothRow(A, Q, QNEG, COUNT, '-M', M, false, bits);
            }
        } else if (QT === '01') {
            A += M;
            if (draw) {
                insertBoothRow(A, Q, QNEG, COUNT, '+M', M, false, bits);
            }
        }

        let shiftAux = getLastBits(A, bits) << bits;
        shiftAux += getLastBits(Q, bits);
        shiftAux = shiftAux << 1;
        shiftAux += getLastBits(QNEG, 1);
        shiftAux = shiftAux >> 1;
        A = shiftAux >> (bits + 1);
        A = A | (((A >> (bits - 2)) & 1)) << (bits - 1);
        Q = shiftAux >> 1 & ((1 << bits) - 1);
        QNEG = shiftAux & 1;
        if (draw) {
            insertBoothRow(A, Q, QNEG, COUNT, "SHIFT", M, true, bits);
        }
    } while (COUNT++ < (bits - 1));
    if (A >> (bits - 1) === 1) {
        return (((1 << (2 * bits)) - 1) << (2 * bits)) + ((A << bits) + Q);

    } else {
        return ((A << bits) + Q);
    }
}

export function runRestoring(Q, M, draw = true, bits = 8) {
    let A = 0;
    let COUNT = 0;
    if (draw) {
        document.querySelector('#division-restoring tbody').innerHTML = '';
        insertDivisionRestoringRow(A, Q, COUNT, 'initial', M, false, bits);
    }
    do {
        let AQ = (A << bits) + Q;
        AQ = AQ << 1;
        A = AQ >>> bits;
        Q = AQ & fillOnes(bits);
        if (draw) {
            insertDivisionRestoringRow(A, Q, COUNT, 'SHIFT LEFT AQ', M, false, bits);
        }
        A -= M;
        if (draw) {
            insertDivisionRestoringRow(A, Q, COUNT, '-M', M, false, bits);
        }
        if (((A & (1 << bits)) >> bits) == 0) {
            Q = Q | 1;
            if (draw) {
                insertDivisionRestoringRow(A, Q, COUNT, 'Q[0]=1', M, true, bits);
            }
        } else {
            Q = (Q >>> 1) << 1;
            A += M;
            if (draw) {
                insertDivisionRestoringRow(A, Q, COUNT, 'Q[0]=0 & restore A', M, true, bits);
            }
        }
    } while (COUNT++ < (bits - 1))

    return {
        quotient: Q,
        remainder: A
    }
}


export function runNonRestoring(Q, M, draw = true, bits = 8) {
    let A = 0;
    let COUNT = 0;
    if (draw) {
        document.querySelector('#division-non-restoring tbody').innerHTML = '';
        insertDivisionNonRestoringRow(A, Q, COUNT, 'initial', M, false, bits);
    }
    do {

        if (((A & (1 << bits)) >> bits) == 0) {
            let AQ = (A << bits) + Q;
            AQ = AQ << 1;
            A = AQ >>> bits;
            Q = AQ & fillOnes(bits);
            if (draw) {
                insertDivisionNonRestoringRow(A, Q, COUNT, 'SHIFT LEFT AQ', M, false, bits);
            }

            A -= M;
            if (draw) {
                insertDivisionNonRestoringRow(A, Q, COUNT, '-M', M, false, bits);
            }

        } else {
            let AQ = (A << bits) + Q;
            AQ = AQ << 1;
            A = AQ >>> bits;
            Q = AQ & fillOnes(bits);
            if (draw) {
                insertDivisionNonRestoringRow(A, Q, COUNT, 'SHIFT LEFT AQ', M, false, bits);
            }

            A += M;
            if (draw) {
                insertDivisionNonRestoringRow(A, Q, COUNT, '+M', M, false, bits);
            }

        }
        if (((A & (1 << bits)) >> bits) == 0) {
            Q = Q | 1;
            if (draw) {
                insertDivisionNonRestoringRow(A, Q, COUNT, 'Q[0] = 1', M, true, bits);
            }
        } else {
            Q = (Q >>> 1) << 1;
            if (draw) {
                insertDivisionNonRestoringRow(A, Q, COUNT, 'Q[0] = 0', M, true, bits);
            }
        }
    } while (COUNT++ < (bits - 1));

    if (((A & (1 << bits)) >> bits) == 1) {
        A += M;
        if (draw) {
            insertDivisionNonRestoringRow(A, Q, COUNT, 'CORRECTION', M, true, bits);
        }
    }
    return {
        quotient: getLastBits(Q, bits),
        remainder: getLastBits(A, bits + 1)
    }
}


export function runRadix4Srt(A, B, draw = true, bits = 8) {
    let P = 0;
    let k = 0;
    while ((B & 0x80) != 0) {
        B = B << 1;
        k++;
    }
    const b = (B >> (8 - 4)) & 0xF;
    B = B >> k;

    let PA = (P << 8) + A;
    PA = PA << K;
    P = (PA >> 8) & 0XFF;
    A = PA & 0xFF;

    let q = (P >> (8 - 6)) & 0x3F;

    PA = (P << 8) + A;
    PA = PA << q;
    P = (PA >> 8) & 0XFF;
    A = PA & 0xFF;
}