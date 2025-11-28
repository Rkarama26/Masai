"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
class Car {
    constructor(brand, engine, color, sunroof, automaticTransmission) {
        this.brand = brand;
        this.engine = engine;
        this.color = color;
        this.sunroof = sunroof;
        this.automaticTransmission = automaticTransmission;
    }
    toString() {
        return `Car [brand=${this.brand}, engine=${this.engine}, color=${this.color}, sunroof=${this.sunroof}, automaticTransmission=${this.automaticTransmission}]`;
    }
}
exports.Car = Car;
//# sourceMappingURL=Car.js.map