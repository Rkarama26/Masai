/*
Define a function taskOne() that logs "Task 1 completed".
Define a function taskTwo(callback) that logs "Task 2 completed" and then executes the callback function.
Call taskTwo(taskOne) to ensure taskOne runs only after taskTwo finishes.
*/

function taskOne() {
  console.log("Task 1 completed");
}

function taskTwo(callback) {
  console.log("Task 2 completed");
  callback(); // call the function passed as an argument
}

// Call taskTwo 
taskTwo(taskOne);
