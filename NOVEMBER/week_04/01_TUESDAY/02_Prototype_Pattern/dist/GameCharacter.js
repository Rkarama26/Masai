"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCharacter = void 0;
class GameCharacter {
    constructor(name, level, weapon) {
        this.name = name;
        this.level = level;
        this.weapon = weapon;
    }
    clone() {
        return new GameCharacter(this.name, this.level, this.weapon);
    }
    toString() {
        return `GameCharacter [name=${this.name}, level=${this.level}, weapon=${this.weapon}]`;
    }
}
exports.GameCharacter = GameCharacter;
//# sourceMappingURL=GameCharacter.js.map