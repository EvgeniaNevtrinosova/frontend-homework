"use strict";
const checkNumber = /-?infinity|-?\d*\.\d+e[+-]?\d+|-?\d*\.\d+|-?\d+e[+-]?\d+|-?\d+/ig;

const minmax = str => {
    const numbers = str.match(checkNumber);

    if (numbers === null) return [undefined, undefined];

    return numbers.reduce((minMaxArray, current) => {
        if (minMaxArray[0] > current) minMaxArray[0] = +current;
        if (minMaxArray[1] < current) minMaxArray[1] = +current;
        return minMaxArray;
    }, [Infinity, -Infinity]);

};
