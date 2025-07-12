
import { Person } from './person.js';

function Employee(name, age, jobTitle) {
  Person.call(this, name, age); // Inherit name and age from person constructor
  this.jobTitle = jobTitle;
}

// Inherit Person's prototype
Employee.prototype = Object.create(Person.prototype);
//reset constructor
Employee.prototype.constructor = Employee;

// Add work() method
Employee.prototype.work = function () {
  console.log(`${this.name} is working as a ${this.jobTitle}.`);
};

const e = new Employee("Rohit", 22, "Manager");
e.introduce(); 
e.work();      

