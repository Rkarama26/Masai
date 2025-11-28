import { Pizza } from "./Pizza";

export class PizzaBuilder {
  private size: string = "small";
  private cheese: boolean = false;
  private pepperoni: boolean = false;
  private mushrooms: boolean = false;

  setSize(size: string): PizzaBuilder {
    this.size = size;
    return this;
  }

  setCheese(cheese: boolean): PizzaBuilder {
    this.cheese = cheese;
    return this;
  }

  setPepperoni(pepperoni: boolean): PizzaBuilder {
    this.pepperoni = pepperoni;
    return this;
  }

  setMushrooms(mushrooms: boolean): PizzaBuilder {
    this.mushrooms = mushrooms;
    return this;
  }

  build(): Pizza {
    return new Pizza(this.size, this.cheese, this.pepperoni, this.mushrooms);
  }
}
