import { CheeseDecorator } from "./CheeseDecorator.js";
import { Pizza } from "./Pizza.js";
import { PlainPizza } from "./PlainPizza.js";

const plainPizza = new PlainPizza();
 console.log(`Description: ${plainPizza.getDescription()}`);
 console.log(`Cost: $${plainPizza.getCost()}`);


const cheesTopping = new CheeseDecorator(plainPizza)
console.log(`Description: ${cheesTopping.getDescription()}`);
console.log(`Cost: $${cheesTopping.getCost()}`);







