function personInfo() {
  console.log("Name:", this.name);
  console.log("Age:", this.age);
}

const person = {
  name: "Rohit",
  age: 22
};

personInfo.call(person);
