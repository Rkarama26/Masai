interface Printable {
  print(): void;
}

interface Scannable {
  scan(): void;
}

interface Faxable {
  fax(): void;
}

class OldPrinter implements Printable {
  print(): void {
    console.log("Printing...");
  }
}

class SmartPrinter implements Printable, Scannable, Faxable {
  print(): void {
    console.log("Printing...");
  }

  scan(): void {
    console.log("Scanning...");
  }

  fax(): void {
    console.log("Faxing...");
  }
}
