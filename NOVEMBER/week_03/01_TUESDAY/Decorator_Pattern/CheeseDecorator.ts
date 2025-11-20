import { Decorator } from "./Decorator.js";

export class CheeseDecorator extends Decorator {
    
  getCost(): number {
    return this.pizza.getCost() + 20;
  }
  getDescription(): string {
    return this.pizza.getDescription() + ", with Cheese";
  }
}
