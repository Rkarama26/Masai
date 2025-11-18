class User {
  name: string;
  protected role;
  private orgCode = "DuckCorp";

  constructor(name: string, role: string) {
    this.name = name;
    this.role = role;
  }
  introduce() {
    console.log(`Hi, I am ${this.name} from ${this.orgCode}`);
  }
}

class Manager extends User {
  getRole() {
    console.log(`${this.role}`);
  }
}

const manager = new Manager("Alice", "Manager");
manager.introduce(); // Output: Hi, I am Alice from DuckCorp
manager.getRole(); // Output: My role is Manager
