const original = {
  name: "Rohit",
  age: 22,
  skills: ["JavaScript", "Java"]
};

const cloned = deepClone(original);

cloned.name = "Karma";
cloned.skills.push("Python");

console.log("Original:", original);
console.log("Cloned:", cloned);


function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
