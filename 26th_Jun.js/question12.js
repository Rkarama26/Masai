

/*
Create a closure that simulates a simple counter. 
Implement a function createCounter that has a private 
count variable. The function should return two methods: 
increment to increase the count by 1 and 
getCount to return the current value of the counter. 
*/
function createCount(){
  let count = 0;
  
  return {
    increment: () => {
    count++;
    return count
  },
  
  getCount: () => {
     return count;
  }
  }
}

let counter = createCount();

console.log(counter.increment())
console.log(counter.increment())
console.log(counter.getCount())