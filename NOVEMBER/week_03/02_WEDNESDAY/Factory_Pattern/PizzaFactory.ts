import type { IPizza } from "./Types.js";

export abstract class PizzaFactory {
  abstract createPizza(type: string): IPizza;
  orderPizza(type: string): void {
    // factory function
    const pizza = this.createPizza(type);
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
  }
}
