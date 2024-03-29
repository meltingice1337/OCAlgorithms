import './main.css';
import 'bootstrap';

import {
    runBoothRadix4,
    runBooth,
    runRestoring,
    runNonRestoring,
    runRadix4Srt,
    runRadix2Srt
} from "./scripts/algorithms";
import { findDigitsQuotient, hexDecode } from './scripts/util';

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.hostname === hexDecode('006f0063002e0064006100720069007500730063006f00730074006f006c00610073002e006d0065')) {
        const boothRadix4Tab = document.querySelector('#pills-booth-radix4');
        const boothTab = document.querySelector('#pills-booth');
        const restoringTab = document.querySelector('#pills-restoring');
        const nonRestoringTab = document.querySelector('#pills-non-restoring');
        const radix4SRTTab = document.querySelector('#pills-r4-srt');
        const radix2SRTTab = document.querySelector('#pills-r2-srt');

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

        radix4SRTTab
            .querySelector('button')
            .addEventListener('click', function (e) {
                e.preventDefault();
                radix4SRTTab.querySelector('table').style.display = "table";
                const A = radix4SRTTab.querySelector('.q-input').value;
                const B = radix4SRTTab.querySelector('.m-input').value;
                const Bits = radix4SRTTab.querySelector('.bits-input').value;
                runRadix4Srt(Number(A), Number(B), true, Number(Bits));
            });

        radix2SRTTab
            .querySelector('button')
            .addEventListener('click', function (e) {
                e.preventDefault();
                radix2SRTTab.querySelector('table').style.display = "table";
                const A = radix2SRTTab.querySelector('.q-input').value;
                const B = radix2SRTTab.querySelector('.m-input').value;
                const Bits = radix2SRTTab.querySelector('.bits-input').value;
                runRadix2Srt(Number(A), Number(B), true, Number(Bits));
            });
    }
});