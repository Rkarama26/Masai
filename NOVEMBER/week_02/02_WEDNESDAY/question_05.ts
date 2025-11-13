interface Printable {
  print(): void;
}

class Document implements Printable {
  print(): void {
    console.log("Printing document...");
  }
}
const myDocument = new Document();
myDocument.print();

class Photo implements Printable {
  print(): void {
    console.log("Printing photo...");
  }
}

const myPhoto = new Photo();
myPhoto.print();