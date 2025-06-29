// Helper function to log the message
function logMessage(count) {
  console.log(`Counting up at ${count}`);
}

// Main function that performs count up using recursion
function countUp(current, target) {
  if (current > target) return;   
  logMessage(current);             
  countUp(current + 1, target);    
}

countUp(0, 3);
