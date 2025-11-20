import { Pizza } from "./Pizza.js";


export class PlainPizza extends Pizza {
    getCost(): number {
        return 5;
    }
    getDescription(): string {
        return "Plain Pizza";
    }

}

