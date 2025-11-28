"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameCharacter_1 = require("./GameCharacter");
const warrior = new GameCharacter_1.GameCharacter("Warrior", 10, "sword");
const warriorClone = warrior.clone();
warriorClone.name = "Warrior Clone";
console.log(warrior.toString());
console.log(warriorClone.toString());
//# sourceMappingURL=main.js.map