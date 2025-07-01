

/*
 tasks:

Use the slice method to extract a subarray from the third element (inclusive) to the fifth element (exclusive).
Reverse the extracted subarray and return it.
*/


let original = [15, 30, 45, 60, 75, 90];

let subArray = original.slice(2, 6)
console.log(subArray.reverse())