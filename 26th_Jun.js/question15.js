/*
Write a function createCounter() that creates a counter.
 The counter should start at 0 and increment by 1 each 
 time it's called. Use a closure to maintain the count value 
 across multiple calls.
*/

function createCounter() {
  let count = 0; // This variable is enclosed by the returned function

  return function () {
    return ++count; 
  };
}
const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
