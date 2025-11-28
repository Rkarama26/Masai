"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarBuilder = void 0;
const Car_1 = require("./Car");
class CarBuilder {
    constructor() {
        this.brand = '';
        this.engine = '';
        this.color = '';
        this.sunroof = false;
        this.automaticTransmission = false;
    }
    setBrand(brand) {
        this.brand = brand;
        return this;
    }
    setEngine(engine) {
        this.engine = engine;
        return this;
    }
    setColor(color) {
        this.color = color;
        return this;
    }
    setSunroof(sunroof) {
        this.sunroof = sunroof;
        return this;
    }
    setAutomaticTransmission(automaticTransmission) {
        this.automaticTransmission = automaticTransmission;
        return this;
    }
    build() {
        return new Car_1.Car(this.brand, this.engine, this.color, this.sunroof, this.automaticTransmission);
    }
}
exports.CarBuilder = CarBuilder;
//# sourceMappingURL=CarBuilder.js.map