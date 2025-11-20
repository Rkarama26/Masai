import { Pizza } from "./Pizza.js";

export abstract class Decorator extends Pizza {
  
    constructor(protected pizza: Pizza) {
    super();
  }
}
