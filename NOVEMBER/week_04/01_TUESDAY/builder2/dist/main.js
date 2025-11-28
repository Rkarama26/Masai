"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CarBuilder_1 = require("./CarBuilder");
const car = new CarBuilder_1.CarBuilder()
    .setBrand('Tesla')
    .setEngine('electric')
    .setColor('black')
    .setSunroof(true)
    .setAutomaticTransmission(true)
    .build();
console.log(car.toString());
//# sourceMappingURL=main.js.map