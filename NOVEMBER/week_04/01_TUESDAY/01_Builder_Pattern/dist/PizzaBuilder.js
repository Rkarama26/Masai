"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PizzaBuilder = void 0;
const Pizza_1 = require("./Pizza");
class PizzaBuilder {
    constructor() {
        this.size = "small";
        this.cheese = false;
        this.pepperoni = false;
        this.mushrooms = false;
    }
    setSize(size) {
        this.size = size;
        return this;
    }
    setCheese(cheese) {
        this.cheese = cheese;
        return this;
    }
    setPepperoni(pepperoni) {
        this.pepperoni = pepperoni;
        return this;
    }
    setMushrooms(mushrooms) {
        this.mushrooms = mushrooms;
        return this;
    }
    build() {
        return new Pizza_1.Pizza(this.size, this.cheese, this.pepperoni, this.mushrooms);
    }
}
exports.PizzaBuilder = PizzaBuilder;
//# sourceMappingURL=PizzaBuilder.js.map