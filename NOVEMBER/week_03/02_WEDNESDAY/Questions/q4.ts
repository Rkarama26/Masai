interface Character {
  getStats(): string;
}

class Warrior implements Character {
  constructor(private name: string) {}
  getStats(): string {
    return `Warrior ${this.name} - Strength: 90, Agility: 60, Intelligence: 40`;
  }
}

class Archer implements Character {
  constructor(private name: string) {}
  getStats(): string {
    return `Archer ${this.name} - Agility: 80, Strength: 40`;
  }
}

class Mage implements Character {
  constructor(private name: string) {}
  getStats(): string {
    return `Mage ${this.name} - Intelligence: 90, Mana: 100`;
  }
}

class CharacterFactory {
  static createCharacter(type: string, name: string): Character {
    switch (type) {
      case "Warrior":
        return new Warrior(name);
      case "Archer":
        return new Archer(name);
      case "Mage":
        return new Mage(name);
      default:
        throw new Error("Invalid character type");
    }
  }
}

const archer = CharacterFactory.createCharacter("Archer", "Eldrin");
console.log(archer.getStats());
// Output: Archer Eldrin - Agility: 80, Strength: 40

const mage = CharacterFactory.createCharacter("Mage", "Gandalf");
console.log(mage.getStats());
// Output: Mage Gandalf - Intelligence: 90, Mana: 100
