abstract class Tea {
  abstract getDescription(): string;
  abstract getCost(): number;
}

class GreenTea extends Tea {
  getDescription(): string {
    return "Green Tea";
  }
  getCost(): number {
    return 30;
  }
}

abstract class ToppingDecorator extends Tea {
  protected tea: Tea;
  constructor(tea: Tea) {
    super();
    this.tea = tea;
  }
  abstract getDescription(): string;
  abstract getCost(): number;
}

class Sugar extends ToppingDecorator {
  getDescription(): string {
    return this.tea.getDescription() + " + Sugar";
  }
  getCost(): number {
    return this.tea.getCost() + 20;
  }
}

class Honey extends ToppingDecorator {
  getDescription(): string {
    return this.tea.getDescription() + " + Honey";
  }
  getCost(): number {
    return this.tea.getCost() + 20;
  }
}

const tea = new Honey(new Sugar(new GreenTea()));
console.log(tea.getDescription()); // Green Tea + Sugar + Honey
console.log(tea.getCost()); // 70
