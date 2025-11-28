"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pizza = void 0;
class Pizza {
    constructor(size, cheese, pepperoni, mushrooms) {
        this.size = size;
        this.cheese = cheese;
        this.pepperoni = pepperoni;
        this.mushrooms = mushrooms;
    }
    toString() {
        return `Pizza [size=${this.size}, cheese=${this.cheese}, pepperoni=${this.pepperoni}, mushrooms=${this.mushrooms}]`;
    }
}
exports.Pizza = Pizza;
//# sourceMappingURL=Pizza.js.map