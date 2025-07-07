function startTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Task A completed");
    }, 1000);
  });
}

function processTask(taskAOutput) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Task B processed: ${taskAOutput}`);
    }, 1500);
  });
}

function finalizeTask(taskBOutput) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Final result: ${taskBOutput}`);
    }, 500);
  });
}

startTask()
  .then((taskAOutput) => {
    console.log(taskAOutput); // "Task A completed"
    return processTask(taskAOutput);
  })
  .then((taskBOutput) => {
    console.log(taskBOutput); // "Task B processed: Task A completed"
    return finalizeTask(taskBOutput);
  })
  .then((finalOutput) => {
    console.log(finalOutput); // "Final result: Task B processed: Task A completed"
  })
  .catch((error) => {
    console.error("Error:", error); // Logs if any task fails
  });
