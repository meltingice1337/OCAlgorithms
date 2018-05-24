import './main.css';

import { runBoothRadix4, runBooth } from "./scripts/algorithms";

document.addEventListener('DOMContentLoaded', function () {
    console.log(runBoothRadix4(-127, -25), 127 * 25);
    console.log(runBooth(-127, -25), 127 * 25);

})

