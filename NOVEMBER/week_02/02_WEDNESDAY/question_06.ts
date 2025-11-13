class Person {
  walk(): void {}
}

interface Coder {
  code(): void;
}

class Developer extends Person implements Coder {
  code(): void {
    console.log("Developer is coding");
  }
  walk(): void {
    console.log("Developer is walking");
  }
}
