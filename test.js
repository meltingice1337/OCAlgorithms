import 'babel-polyfill';
const expect = require('chai').expect;
import { runBooth, runBoothRadix4, runRestoring, runNonRestoring, runRadix4Srt } from './src/scripts/algorithms';
describe('Booth RADIX-4', function () {
    it('Calculates the correct answer', function () {
        for (let i = 0; i < 10000; i++) {
            let M = randomNumber();
            let Q = randomNumber();

            let value = runBoothRadix4(M, Q, false);
            expect(value, `M=${M}; Q=${Q}`).to.equal(M * Q);
        }
    });
});

describe('Booth', function () {
    it('Calculates the correct answer', function () {
        for (let i = 0; i < 10000; i++) {
            let M = randomNumber();
            let Q = randomNumber();

            let value = runBooth(M, Q, false);
            expect(value, `M=${M}; Q=${Q}`).to.equal(M * Q);
        }
    });
});

describe('Divsion Restoring', function () {
    it('Calculates the correct answer', function () {
        for (let i = 0; i < 10000; i++) {
            let Q = randomNumber(1, 900, true);
            let M = randomNumber(1, 900, true);

            let value = runRestoring(Q, M, false, 10);
            expect(value.quotient, `Invalid Quotient; Q=${Q};M=${M}`).to.equal(Math.floor(Q / M));
            expect(value.remainder, `Invalid Remainder; Q=${Q};M=${M}`).to.equal(Q % M);
        }
    });
});

describe('Divsion Non-Restoring', function () {
    it('Calculates the correct answer', function () {
        for (let i = 0; i < 10000; i++) {
            let Q = randomNumber(1, 900, true);
            let M = randomNumber(1, 900, true);

            let value = runNonRestoring(Q, M, false, 10);
            expect(value.quotient, `Invalid Quotient; Q=${Q};M=${M}`).to.equal(Math.floor(Q / M));
            expect(value.remainder, `Invalid Remainder; Q=${Q};M=${M}`).to.equal(Q % M);
        }
    });
});

describe('Divsion RADIX-4 SRT', function () {
    it('Calculates the correct answer', function () {
        for (let i = 0; i < 10000; i++) {
            let Q = randomNumber(1, 300, true);
            let M = randomNumber(1, 300, true);

            let value = runRadix4Srt(Q, M, false, 10);
            expect(value.quotient, `Invalid Quotient; Q=${Q};M=${M}`).to.equal(Math.floor(Q / M));
            expect(value.remainder, `Invalid Remainder; Q=${Q};M=${M}`).to.equal(Q % M);
        }
    });
});

function randomNumber(from = 1, to = 100, positive = false) {
    let number = Math.floor(Math.random() * to) + from;
    let sign = Math.random() < 0.5 ? -1 : 1;
    if (positive) {
        sign = 1;
    }
    return number * sign;
}