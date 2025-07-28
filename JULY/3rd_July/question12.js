// Step 1: Simulate Data Fetching with a Promise

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomValue = Math.random(); 

      if (randomValue > 0.5) {
        resolve(" Data fetched successfully!");
      } else {
        reject(" Failed to fetch data.");
      }
    }, 1000); // Simulate 1 second delay
  });
}

// Step 2: Async handler function
async function fetchDataHandler() {
  try {
    const result = await fetchData(); // Wait for Promise
    console.log(result);              // Log success message
  } catch (error) {
    console.error("Error fetching data:", error); // Handle error
  }
}

fetchDataHandler();
