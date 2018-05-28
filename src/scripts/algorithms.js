import {
    insertBoothRadix4Row,
    insertBoothRow,
    insertDivisionRestoringRow,
    insertDivisionNonRestoringRow,
    insertDivisionRadix4SRTRow
} from './renderer';
import {
    getLastBits,
    toBinary,
    consoleBinaryPrint,
    fillOnes,
    findDigitsQuotient
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
    let i = 0;
    let qArr = new Array(Math.ceil((bits - 1) / 2));
    if (draw) {
        document.querySelector('#division-r4-srt').style.display = 'table';
        document.querySelector('#division-r4-srt tbody').innerHTML = '';
        insertDivisionRadix4SRTRow(P, qArr, A, 'initial', B, true, bits);
    }
    while ((B >> (bits - 1)) === 0) {
        B = B << 1;
        k++;
    }

    const b = ((B & fillOnes(bits)) >> (bits - 4)) & 0xF;

    let PA = (P << bits) + (A & fillOnes(bits));
    PA = PA << k;
    P = (PA >> bits) & fillOnes(bits + 1);
    A = PA & fillOnes(bits);
    if (draw) {
        insertDivisionRadix4SRTRow(P, qArr, A, `LS(B) LS(PA) ${k} bits (b=${b})`, B, true, bits);
    }

    while (i++ < Math.ceil((bits - 1) / 2)) {
        let p = ((P & fillOnes(bits + 1)) >> ((bits + 1) - 6)) & 0x3F;
        if (((p >> 5) & 1) == 1) {
            p = p + (fillOnes(26) << 6)
        }
        const q = findDigitsQuotient(b, p);
        qArr.push(q);
        // console.log(p, q);
        let PA = (P << bits) + A;
        PA = PA << 2;
        P = (PA >> bits) & fillOnes(bits + 1);
        A = PA & fillOnes(bits);
        if (draw) {
            insertDivisionRadix4SRTRow(P, qArr, A, `LS(PA) 2 bits`, B, false, bits);
        }
        P = P - (q * B);
        if (draw) {
            insertDivisionRadix4SRTRow(P, qArr, A, `P = P - (${q})*B`, B, true, bits);
        }
    }
    let Q = qArr.reverse().reduce((acc, val, i) => acc += val * Math.pow(4, i));
    if ((P >> bits) & 1 == 1) {
        P = P + B;
        Q = Q - 1;
        if (draw) {
            insertDivisionRadix4SRTRow(P, Q, A, `Correct remainder(P+=B) and quotient (q-=1)`, B, true, bits);
        }
    }
    P = (P & fillOnes(bits + 1)) >> k;
    if (draw) {
        insertDivisionRadix4SRTRow(P, Q, A, `Final Correction RS(P) ${k} bits`, B, true, bits);
    }

    return {
        quotient: Q,
        remainder: P
    }
}