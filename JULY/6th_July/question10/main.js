import { Car } from "./car.js";
import { Customer } from "./customer.js";
import { PremiumCustomer } from "./PremiumCustomer.js";

//this is the main file to create all objects here

function calculateRent(days, type, customer) {
    let baseRate = 50;
    let carTypes = {
        suv: 1.5,
        sedan: 1.3,
        min: 1.0
    }
    const typeRate = carTypes[type] || 1.0;

    let cost = baseRate * typeRate * days;

    if (customer instanceof PremiumCustomer) {
        cost = cost*(1 - customer.discountRate);
    }
    return cost.toFixed(2);

}
//cars
let car1 = new Car("Toyota", "Corolla", "2020", "sedan");
let car2 = new Car("Mahindra", "Thar", "2021", "suv");
let car3 = new Car("Tata", "Alto", "2002", "mini");

//customers
let customer1 = new Customer("rohit")
let customer2 = new PremiumCustomer("vansh", 1.1)


customer1.getCarOnRent(car1);
let rent1 = calculateRent(40, "suv", customer1)
console.log(rent1)
customer1.carReturns(car1)
car1.addMaintenance("2024-06-01", "Oil change");
car1.viewMaintenance();

customer2.getCarOnRent(car1);
let rent2 = calculateRent(40, "suv", customer2)
//console.log(rent2)