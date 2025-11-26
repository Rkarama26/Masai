"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedLight = void 0;
const GreenLights_1 = require("./GreenLights");
class RedLight {
    change(state) {
        console.log("Red: Vehicles must stop.");
        state.setState(new GreenLights_1.GreenLights());
    }
}
exports.RedLight = RedLight;
//# sourceMappingURL=RedLight.js.map