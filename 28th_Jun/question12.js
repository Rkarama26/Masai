// 1. Filter 
function filterEvenNumbers(arr) {
  return arr.filter(num => num % 2 === 0);
}

// 2.
function sumOfArray(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

// 3.
function sortAndConcat(arr1, arr2) {
  const sorted1 = arr1.slice().sort((a, b) => a - b);
  const sorted2 = arr2.slice().sort((a, b) => a - b);
  return sorted1.concat(sorted2);
}

const nums = [5, 2, 8, 1, 9, 4];
const arr1 = [3, 1, 7];
const arr2 = [6, 2, 9];

console.log("Even Numbers:", filterEvenNumbers(nums));      // [2, 8, 4]
console.log("Sum of Array:", sumOfArray(nums));             // 29
console.log("Sorted & Concatenated:", sortAndConcat(arr1, arr2)); // [1, 3, 7, 2, 6, 9]
