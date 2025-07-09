// Step 1: Define createInventoryItem
function createInventoryItem(name, category, price) {
  return {
    name,
    category,
    price,
    describeItem() {
      console.log(`Item: ${name}, Category: ${category}, Price: ₹${price}`);
    }
  };
}

// Step 2: Define addItemDiscount
function addItemDiscount(inventoryItem, discountPercent) {
  const discountedPrice = inventoryItem.price - (inventoryItem.price * discountPercent / 100);

  // Add method to the inventoryItem object
  inventoryItem.applyDiscount = function() {
    console.log(`Discounted Price of ${this.name}: ₹${discountedPrice}`);
  };

  return inventoryItem;
}

const item = createInventoryItem("Multimeter", "Electronics", 1200);
item.describeItem(); 

const discountedItem = addItemDiscount(item, 20);
discountedItem.applyDiscount();
