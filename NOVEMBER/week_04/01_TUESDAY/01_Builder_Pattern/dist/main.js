"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PizzaBuilder_1 = require("./PizzaBuilder");
const pizza = new PizzaBuilder_1.PizzaBuilder()
    .setSize("large")
    .setCheese(true)
    .setMushrooms(true)
    .build();
console.log(pizza.toString());
//# sourceMappingURL=main.js.map