"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreenLights = void 0;
const YellowLights_1 = require("./YellowLights");
class GreenLights {
    change(state) {
        console.log("Green: Vehicles can move.");
        state.setState(new YellowLights_1.YellowLights());
    }
}
exports.GreenLights = GreenLights;
//# sourceMappingURL=GreenLights.js.map