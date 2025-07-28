
import { Customer } from "./customer.js";

export function PremiumCustomer(name,discountRate, rentedCars = [], ) {
  Customer.call(this, name, rentedCars); // Inherit from Customer
  this.discountRate = discountRate;
}

PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;
