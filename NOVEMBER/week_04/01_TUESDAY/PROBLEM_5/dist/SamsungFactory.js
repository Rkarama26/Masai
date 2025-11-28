"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamsungFactory = void 0;
const SamsungLaptop_1 = require("./SamsungLaptop");
const SamsungPhone_1 = require("./SamsungPhone");
class SamsungFactory {
    createDevice(type) {
        if (type === 'laptop') {
            return new SamsungLaptop_1.SamsungLaptop();
        }
        else if (type === 'phone') {
            return new SamsungPhone_1.SamsungPhone();
        }
        else {
            throw new Error('Unknown device type');
        }
    }
}
exports.SamsungFactory = SamsungFactory;
//# sourceMappingURL=SamsungFactory.js.map