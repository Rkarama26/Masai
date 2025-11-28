import { PizzaBuilder } from "./PizzaBuilder";

const pizza = new PizzaBuilder()
  .setSize("large")
  .setCheese(true)
  .setMushrooms(true)
  .build();

console.log(pizza.toString());
