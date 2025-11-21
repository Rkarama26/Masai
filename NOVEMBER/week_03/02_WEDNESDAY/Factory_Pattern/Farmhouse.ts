import type { IPizza } from "./Types.js";

export class Farmhouse implements IPizza {
  prepare(): void {
    console.log("Preparing the farmhouse pizza");
  }
  bake(): void {
    console.log("Baking the farmhouse");
  }
  cut(): void {
    console.log("cutting the farmhouse");
  }
  box(): void {
    console.log("boxing the farmhouse");
  }
}
