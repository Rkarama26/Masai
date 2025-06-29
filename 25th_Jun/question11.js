// Step 1: Declare a global variable
let age = 20;

// Step 2: Function that accesses the global variable
function displayAge() {
  console.log("Age (before change):", age);
}

// Step 3: Function that modifies the global variable
function changeAge() {
  age = 25;  // Changing the global variable
  console.log("Age (after change):", age);
}

// Step 4: Function calls
displayAge();   // Output: Age (before change): 20
changeAge();    // Output: Age (after change): 25
displayAge();   // Output: Age (before change): 25
