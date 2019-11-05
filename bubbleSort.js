"use strict";

(function bubbleSort() {
    let array = [50, 10, 2, 4, 6, 3, 80, 25, 1, 0];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                console.log(array.join(" - "));
            }
        }
    }
})();
