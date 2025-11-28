import { AppleFactory } from "./AppleFactory";

import { SamsungFactory } from "./SamsungFactory";

const appleFactory = new AppleFactory();

const samsungFactory = new SamsungFactory();

const appleLaptop = appleFactory.createDevice("laptop");

const samsungPhone = samsungFactory.createDevice("phone");

appleLaptop.specifications();

samsungPhone.specifications();
