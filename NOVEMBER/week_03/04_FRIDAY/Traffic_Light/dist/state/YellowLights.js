"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YellowLights = void 0;
const RedLight_1 = require("./RedLight");
class YellowLights {
    change(state) {
        console.log("Yellow: Vehicles should slow down.");
        state.setState(new RedLight_1.RedLight());
    }
}
exports.YellowLights = YellowLights;
//# sourceMappingURL=YellowLights.js.map