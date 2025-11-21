import type { IPizza } from "./Types.js";

export class Margherita implements IPizza {
  prepare(): void {
    console.log("Preparing the margherita pizza");
  }
  bake(): void {
    console.log("Baking the margherita");
  }
  cut(): void {
    console.log("cutting the margherita");
  }
  box(): void {
    console.log("boxing the margherita");
  }
}
