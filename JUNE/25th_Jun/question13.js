const checkout = {
  items: [],
  total: 0,

  addItem(item) {
    //  if item.price is a valid number and not NaN
    if (typeof item.price !== 'number' || isNaN(item.price)) {
      console.log("Invalid price.");
      return;
    }

    this.items.push(item);
    this.total += item.price;
    console.log(`Added "${item.name}" with price ₹${item.price.toFixed(2)}`);
  },

  getTotal() {
    return `Total: ₹${this.total.toFixed(2)}`;
  }
};


checkout.addItem({ name: "Milk", price: 3.50 });

checkout.addItem({ name: "Coffee Maker", price: 99.95 });

console.log(checkout.getTotal()); // Output: Total: ₹103.45
