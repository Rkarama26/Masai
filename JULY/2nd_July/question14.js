console.log("Begin");  // 1 

setTimeout(() => {  // 2
    console.log("Timeout Task"); 
}, 0); 
Promise.resolve() // 3
.then(() => { 
    console.log("Promise Task"); 
}); 

console.log("End"); // 3

/*
The correct order should be:

Begin
End
Promise Task
Timeout Task
*/

// 1:- This is synchronous code, Executed immediately.

// 2:- setTimeout(...., 0) - this is asynchronous code, 
                        // it registers a macrotask,
                        // placed in macrotask queue
                        // macrotask execute after the synchronous and microtasks.


// 3:- Promise - this creates a micro task, added to the microtask queue,
                // Microtasks are prioritized after the call stack clears,
                // so the then sheduled to run immediately after synchronous code.
                
 
// 4:-  console - synchronous code                