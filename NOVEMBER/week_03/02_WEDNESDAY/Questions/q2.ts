interface Book {
  getCategory(): string;
}

class PremiumBook implements Book {
  private price: number;

  constructor(price: number) {
    this.price = price;
  }
  getCategory(): string {
    return "Premium Book";
  }
}
class RegularBook implements Book {
  private price: number;

  constructor(price: number) {
    this.price = price;
  }
  getCategory(): string {
    return "Regular Book";
  }
}

class BookFactory {
  static createBook(type: string, price: number): Book {
    if (price > 1000) {
      return new PremiumBook(price);
    } else {
      return new RegularBook(price);
    }
  }
}

const b1 = BookFactory.createBook("Design Patterns", 1500);
console.log(b1.getCategory()); // Premium Book

const b2 = BookFactory.createBook("JavaScript Guide", 500);
console.log(b2.getCategory()); // Regular Book


