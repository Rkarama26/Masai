import { Pizza } from "./Pizza";
export declare class PizzaBuilder {
    private size;
    private cheese;
    private pepperoni;
    private mushrooms;
    setSize(size: string): PizzaBuilder;
    setCheese(cheese: boolean): PizzaBuilder;
    setPepperoni(pepperoni: boolean): PizzaBuilder;
    setMushrooms(mushrooms: boolean): PizzaBuilder;
    build(): Pizza;
}
//# sourceMappingURL=PizzaBuilder.d.ts.map