
function doubleNumbers(numbers) {
  return numbers.map(num => num * 2);
}

const original = [1, 2, 3, 4, 5];
const doubled = doubleNumbers(original);

console.log(doubled); 