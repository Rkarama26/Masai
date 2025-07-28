let num = { a: 3, b: 8 };

function multiply() {
  console.log(this.a * this.b);
}

multiply.apply(num); 
