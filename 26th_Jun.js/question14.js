
/*
You are given the following code that is supposed 
to create a list of functions. Each function should 
print a unique index (0, 1, 2, ...) when called. However, 
instead of printing the correct index, every function prints the same final value.

Your task is to debug the code and fix the closure-related issue 
so that each function retains and prints its correct index.
*/


function createFunctionList() {
  let functions = [];

  //using let instead
  for (let i = 0; i < 5; i++) {
    functions.push(function () {
      console.log("Index:", i);
    });
  }

  return functions;
}

const funcList = createFunctionList();
funcList[0](); // Index: 0
funcList[1](); // Index: 1
funcList[4](); // Index: 4
