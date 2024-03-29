import {
    toBinary
} from './util';

export function insertBoothRadix4Row(A, Q, QNEG, COUNT, OP, M, shift = false, bits = 8) {
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>${toBinary(A, bits + 1)}</td>
    <td>${toBinary(Q, bits)}</td>
    <td>${toBinary(QNEG, 1)}</td>
    <td>${toBinary(COUNT, Math.log2(bits / 2))}</td>
    <td>${OP}</td>
    <td>${toBinary(M, bits)}</td>
    `;

    if (shift) {
        row.classList.add('has-underline');
    }
    document.querySelector('#booth-radix4 tbody').appendChild(row);

}

export function insertBoothRow(A, Q, QNEG, COUNT, OP, M, shift = false, bits = 8) {
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>${toBinary(A, bits)}</td>
    <td>${toBinary(Q, bits)}</td>
    <td>${toBinary(QNEG, 1)}</td>
    <td>${toBinary(COUNT, Math.log2(bits))}</td>
    <td>${OP}</td>
    <td>${toBinary(M, bits)}</td>
    `;

    if (shift) {
        row.classList.add('has-underline');
    }
    document.querySelector('#booth tbody').appendChild(row);

}

export function insertDivisionRestoringRow(A, Q, COUNT, OP, M, lastRowInCount = false, bits = 8) {
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>${toBinary(A, bits + 1)}</td>
    <td>${toBinary(Q, bits)}</td>
    <td>${toBinary(COUNT, Math.log2(bits))}</td>
    <td>${OP}</td>
    <td>${toBinary(M, bits + 1)}</td>
    `;

    if (lastRowInCount) {
        row.classList.add('has-underline');
    }
    document.querySelector('#division-restoring tbody').appendChild(row);

}

export function insertDivisionNonRestoringRow(A, Q, COUNT, OP, M, lastRowInCount = false, bits = 8) {
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>${toBinary(A, bits + 1)}</td>
    <td>${toBinary(Q, bits)}</td>
    <td>${toBinary(COUNT, Math.ceil(Math.log2(bits)))}</td>
    <td>${OP}</td>
    <td>${toBinary(M, bits)}</td>
    `;

    if (lastRowInCount) {
        row.classList.add('has-underline');
    }
    document.querySelector('#division-non-restoring tbody').appendChild(row);
}
export function insertDivisionRadix4SRTRow(P, q, A, OP, B, lastRowInCount = false, bits = 8) {
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>${toBinary(P, bits + 1)}</td>
    <td>${toBinary(A, bits)}</td>
    <td>${Array.isArray(q) ? q.slice().reduce((acc, val) => acc += val + ' ', '') : q}</td>
    <td>${OP}</td>
    <td>${toBinary(B, bits)}</td>
    `;

    if (lastRowInCount) {
        row.classList.add('has-underline');
    }
    document.querySelector('#division-r4-srt tbody').appendChild(row);
}

export function insertDivisionRadix2SRTRow(COUNT, P, q, A, OP, B, lastRowInCount = false, bits = 8) {
    let row = document.createElement('tr');
    row.innerHTML = `
    <td>${toBinary(COUNT, Math.log2(bits))}</td>
    <td>${toBinary(P, bits + 1)}</td>
    <td>${toBinary(A, bits)}</td>
    <td>${Array.isArray(q) ? q.slice().reduce((acc, val) => acc += val + ' ', '') : q}</td>
    <td>${OP}</td>
    <td>${toBinary(B, bits)}</td>
    `;

    if (lastRowInCount) {
        row.classList.add('has-underline');
    }
    document.querySelector('#division-r2-srt tbody').appendChild(row);
}