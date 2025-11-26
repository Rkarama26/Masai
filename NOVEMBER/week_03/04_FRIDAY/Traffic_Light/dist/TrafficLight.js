"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrafficLight = void 0;
const RedLight_1 = require("./state/RedLight");
class TrafficLight {
    constructor(state) {
        this.state = state || new RedLight_1.RedLight();
    }
    change() {
        this.state.change(this);
    }
    setState(state) {
        this.state = state;
    }
}
exports.TrafficLight = TrafficLight;
//# sourceMappingURL=TrafficLight.js.map