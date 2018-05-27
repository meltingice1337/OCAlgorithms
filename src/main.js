import './main.css';
import 'bootstrap';

import {
    runBoothRadix4,
    runBooth,
    runRestoring,
    runNonRestoring
} from "./scripts/algorithms";

document.addEventListener('DOMContentLoaded', function () {
    // console.log(runBoothRadix4(2, 2, true, 4), 127 * 25);
    // console.log(runBooth(7, 3, true, 4), 127 * 25);
    // consoleBinaryPrint([fillOnes(5)]);
    // console.log(runRestoring(36, 6), 4);
    // runNonRestoring(11, 3, true, 4);
    const boothRadix4Tab = document.querySelector('#pills-booth-radix4');
    const boothTab = document.querySelector('#pills-booth');
    const restoringTab = document.querySelector('#pills-restoring');
    const nonRestoringTab = document.querySelector('#pills-non-restoring');

    boothRadix4Tab
        .querySelector('button')
        .addEventListener('click', function (e) {
            e.preventDefault();
            boothRadix4Tab.querySelector('table').style.display = "table";
            const Q = boothRadix4Tab.querySelector('.q-input').value;
            const M = boothRadix4Tab.querySelector('.m-input').value;
            const Bits = boothRadix4Tab.querySelector('.bits-input').value;
            runBoothRadix4(Number(M), Number(Q), true, Number(Bits));
        });

    boothTab
        .querySelector('button')
        .addEventListener('click', function (e) {
            e.preventDefault();
            boothTab.querySelector('table').style.display = "table";
            const Q = boothTab.querySelector('.q-input').value;
            const M = boothTab.querySelector('.m-input').value;
            const Bits = boothTab.querySelector('.bits-input').value;
            runBooth(Number(M), Number(Q), true, Number(Bits));
        });

    restoringTab
        .querySelector('button')
        .addEventListener('click', function (e) {
            e.preventDefault();
            restoringTab.querySelector('table').style.display = "table";
            const Q = restoringTab.querySelector('.q-input').value;
            const M = restoringTab.querySelector('.m-input').value;
            const Bits = restoringTab.querySelector('.bits-input').value;
            runRestoring(Number(Q), Number(M), true, Number(Bits));
        });

    nonRestoringTab
        .querySelector('button')
        .addEventListener('click', function (e) {
            e.preventDefault();
            nonRestoringTab.querySelector('table').style.display = "table";
            const Q = nonRestoringTab.querySelector('.q-input').value;
            const M = nonRestoringTab.querySelector('.m-input').value;
            const Bits = nonRestoringTab.querySelector('.bits-input').value;
            runNonRestoring(Number(Q), Number(M), true, Number(Bits));
        });
});