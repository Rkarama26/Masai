import type { IPizza } from "./Types.js";
export declare abstract class PizzaFactory {
    abstract createPizza(type: string): IPizza;
    orderPizza(type: string): void;
}
//# sourceMappingURL=PizzaFactory.d.ts.map