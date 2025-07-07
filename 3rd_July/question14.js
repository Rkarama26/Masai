
function checkEvenNumber(num) {
  return new Promise((resolve, reject) => {
    if (num % 2 === 0) {
      resolve(`${num} is even`);
    } else {
      reject(`${num} is odd`);
    }
  });
}

checkEvenNumber(4)
  .then(console.log)      
  .catch(console.error);

checkEvenNumber(5)
  .then(console.log)
  .catch(console.error); 
