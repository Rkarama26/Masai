"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppleFactory_1 = require("./AppleFactory");
const SamsungFactory_1 = require("./SamsungFactory");
const appleFactory = new AppleFactory_1.AppleFactory();
const samsungFactory = new SamsungFactory_1.SamsungFactory();
const appleLaptop = appleFactory.createDevice('laptop');
const samsungPhone = samsungFactory.createDevice('phone');
appleLaptop.specifications();
samsungPhone.specifications();
//# sourceMappingURL=main.js.map