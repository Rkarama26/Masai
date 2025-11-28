"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleFactory = void 0;
const AppleLaptop_1 = require("./AppleLaptop");
const ApplePhone_1 = require("./ApplePhone");
class AppleFactory {
    createDevice(type) {
        if (type === 'laptop') {
            return new AppleLaptop_1.AppleLaptop();
        }
        else if (type === 'phone') {
            return new ApplePhone_1.ApplePhone();
        }
        else {
            throw new Error('Unknown device type');
        }
    }
}
exports.AppleFactory = AppleFactory;
//# sourceMappingURL=AppleFactory.js.map