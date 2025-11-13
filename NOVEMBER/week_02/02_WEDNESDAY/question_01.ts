class Student {
  name: string;
  age: number;
  rollno: number;

  constructor(name: string, age: number, rolleno: number) {
    this.name = name;
    this.age = age;
    this.rollno = rolleno;
  }
  display(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}, Roll No: ${this.rollno}`);
  }

}
const student1 = new Student("Alice", 20, 101);
student1.display();
const student2 = new Student("Bob", 22, 102);
student2.display();
