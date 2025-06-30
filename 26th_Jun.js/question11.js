/*
Create a simple function outerFunction that defines a 
variable message within its scope. 
Return an inner function that logs the message when invoked.
*/

function outerFunc(){
  let message = "Hey i'm good";
  
  return () => {
    console.log(message)
  }
}


let outer = outerFunc();
outer()