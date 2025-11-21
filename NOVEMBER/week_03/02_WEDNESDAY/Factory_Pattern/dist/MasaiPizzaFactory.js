import { Farmhouse } from "./Farmhouse.js";
import { Margherita } from "./Margherita.js";
import { Nonveg } from "./Nonveg.js";
import { PizzaFactory } from "./PizzaFactory.js";
export class MasaiPizzaFactory extends PizzaFactory {
    createPizza(type) {
        switch (type) {
            case "Margherita":
                return new Margherita();
            case "Farmhouse":
                return new Farmhouse();
            case "Nonveg":
                return new Nonveg();
            default:
                throw new Error("Incorrect Pizza Type");
        }
    }
}
//# sourceMappingURL=MasaiPizzaFactory.js.map