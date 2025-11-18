class Animal {
  makeSound(): void {
    console.log("Some sound");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Bark!");
  }
}

function makeAnimalSound(animal: Animal) {
  animal.makeSound();
}

// Demonstration of runtime polymorphism
const genericAnimal = new Animal();
const dog = new Dog();

console.log("Generic animal sound:");
makeAnimalSound(genericAnimal); // Outputs: Some sound

console.log("Dog sound:");
makeAnimalSound(dog); // Outputs: Bark! (substituted Dog object works)
