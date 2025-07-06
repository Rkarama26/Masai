const intervalId = setInterval(() => {
  console.log("Loading...");
}, 1000);

setTimeout(() => {
  clearInterval(intervalId);
  console.log("Loaded successfully!");
}, 5000);
