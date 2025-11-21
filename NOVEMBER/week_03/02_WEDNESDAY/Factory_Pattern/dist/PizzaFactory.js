export class PizzaFactory {
    orderPizza(type) {
        // factory function
        const pizza = this.createPizza(type);
        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();
    }
}
//# sourceMappingURL=PizzaFactory.js.map