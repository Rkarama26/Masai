import type { IPizza } from "./Types.js";

export class Nonveg implements IPizza {
  prepare(): void {
    console.log("Preparing the nonveg pizza");
  }
  bake(): void {
    console.log("Baking the nonveg");
  }
  cut(): void {
    console.log("cutting the nonveg");
  }
  box(): void {
    console.log("boxing the nonveg");
  }
}
