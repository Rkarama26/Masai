/*
Problem Statement:

Refactor ProductFactory to remove if-else/switch and use a class map. Implement a pluggable strategy so new product types can be added without touching the factory logic.

Guidelines:

type ProductConstructor = new (name: string, price: number) => Product;

const productMap: Record<string, ProductConstructor> = {
  Laptop: Laptop,
  Mobile: Mobile,
  Tablet: Tablet
};

class ProductFactory {
  static createProduct(type: string, name: string, price: number): Product {
    const ProductClass = productMap[type];
    if (!ProductClass) throw new Error("Unknown product type");
    return new ProductClass(name, price);
  }
}
*/

interface Product {
  getDetails(): string;
}

class Laptop implements Product {
  constructor(private name: string, private price: number) {}
  getDetails(): string {
    return `Laptop: ${this.name}, Price: $${this.price}`;
  }
}

class Mobile implements Product {
  constructor(private name: string, private price: number) {}
  getDetails(): string {
    return `Mobile: ${this.name}, Price: $${this.price}`;
  }
}

class Tablet implements Product {
  constructor(private name: string, private price: number) {}
  getDetails(): string {
    return `Tablet: ${this.name}, Price: $${this.price}`;
  }
}

type ProductConstructor = new (name: string, price: number) => Product;

const productMap: Record<string, ProductConstructor> = {
  Laptop: Laptop,
  Mobile: Mobile,
  Tablet: Tablet,
};

class ProductFactory {
  static createProduct(type: string, name: string, price: number): Product {
    const ProductClass = productMap[type];
    if (!ProductClass) throw new Error("Unknown product type");
    return new ProductClass(name, price);
  }
}

// Usage
const laptop = ProductFactory.createProduct("Laptop", "Dell XPS", 1200);
console.log(laptop.getDetails());

const mobile = ProductFactory.createProduct("Mobile", "iPhone 15", 999);
console.log(mobile.getDetails());

const tablet = ProductFactory.createProduct("Tablet", "iPad Pro", 799);
console.log(tablet.getDetails());
