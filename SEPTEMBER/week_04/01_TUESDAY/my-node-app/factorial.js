

function factorial(n) {
    if (isNaN(n)) {
        return 'Input is not a number.';
    }
    if (n < 0) {
        return 'Undefined for negative numbers';
    }
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

module.exports = factorial;