task = ["t1", "t2", "t3", "t4", "t5"];

task.shift(0);
task.unshift("ht1");
task.unshift("ht2");

let first = task[0];
let last = task[5];

task.splice(0, 1, last); 
task.splice(task.length - 1, 1, first);

task.splice();
console.log(task);

