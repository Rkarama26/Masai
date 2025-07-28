/*
Write a function memoize(fn) that takes a function fn as input and returns a memoized version of that function using closures. The memoized function should store results of previous calls to avoid recalculating them for the same input.

Requirements:
The memoize() function should return a function that:

Caches the result of fn based on its arguments.
If the same arguments are passed again, return the cached result instead of recalculating.
Use closures to store the cache.

Bonus:
Make sure the cache has a maximum size (e.g., 5) and removes the oldest entry when it exceeds the limit.


*/

function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = args.toString();
    if (key in cache) {
      console.log("From cache:", key);
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function factorial(n) {
  console.log("Calculating factorial for", n);
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

const memoizedFactorial = memoize(factorial);

console.log(memoizedFactorial(5)); // Calculates
console.log(memoizedFactorial(5)); // From cache
console.log(memoizedFactorial(6)); // Recalculates (5 is cached, but not 6)
