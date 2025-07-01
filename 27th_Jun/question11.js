function processProducts(products) {
  //  1: Use map() to extract product names
  const productNames = products.map(product => product.name);

  //  2: Use forEach() to log messages based on price
  products.forEach(product => {
    const message = product.price > 50
      ? `${product.name} is above $50`
      : `${product.name} is below $50`;
    console.log(message);
  });

  return productNames;
}

const products = [
  { name: "Mouse", price: 25 },
  { name: "Keyboard", price: 75 },
  { name: "Monitor", price: 150 },
  { name: "USB Cable", price: 10 }
];

const names = processProducts(products);

console.log("Product Names:", names);
