import 'babel-polyfill';
const expect = require('chai').expect;
import { runBooth, runBoothRadix4 } from './src/scripts/algorithms';
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
function randomNumber() {
    let number = Math.floor(Math.random() * 100) + 1;
    let sign = Math.random() < 0.5 ? -1 : 1;
    return number * sign;
}