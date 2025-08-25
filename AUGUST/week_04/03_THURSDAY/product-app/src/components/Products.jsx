import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  // Filter 
  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  // Sort 
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low") return a.price - b.price;
    if (sortOrder === "high") return b.price - a.price;
    return 0;
  });

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Products</h1>

      <div>
        <label>Filter by category: </label>
        <select onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label style={{ marginLeft: "1rem" }}>Sort by price: </label>
        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">None</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      <ul>
        {sortedProducts.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.title}</Link> - $
            {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
