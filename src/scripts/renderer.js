import { toBinary } from './util';

let insertBoothRadix4Row = function (A, Q, QNEG, COUNT, OP, M, shift = false) {
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>${toBinary(A, 9)}</td>
    <td>${toBinary(Q, 8)}</td>
    <td>${toBinary(QNEG, 1)}</td>
    <td>${toBinary(COUNT, 2)}</td>
    <td>${OP}</td>
    <td>${toBinary(M, 8)}</td>
    `;

    if (shift) {
        row.classList.add('has-underline');
    }
    document.querySelector('#booth-radix4 tbody').appendChild(row);

}

let insertBoothRow = function (A, Q, QNEG, COUNT, OP, M, shift = false) {
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>${toBinary(A, 8)}</td>
    <td>${toBinary(Q, 8)}</td>
    <td>${toBinary(QNEG, 1)}</td>
    <td>${toBinary(COUNT, 3)}</td>
    <td>${OP}</td>
    <td>${toBinary(M, 8)}</td>
    `;

    if (shift) {
        row.classList.add('has-underline');
    }
    document.querySelector('#booth tbody').appendChild(row);

}

module.exports = {
    insertBoothRadix4Row,
    insertBoothRow
}