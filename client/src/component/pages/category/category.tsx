import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../products/product"; // ✅ استدعاء component الجاهز
// import Navbar from "../nav/navbar";
import { Link } from "react-router";

function Category() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ✅ fetch categories
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/categories");
        setCategories(response.data.data || response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategory();
  }, []);

  // ✅ fetch all products by default
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/products");
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };
    fetchAllProducts();
  }, []);

  // ✅ fetch products by category
  const fetchProducts = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/products?category=${categoryId}`
      );
      setProducts(response.data.products || []);
      setSelectedCategory(categoryId);
      console.log("catagory selected id:"+selectedCategory)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <>
    
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left side categories */}
      <div
        className="category-list"
        style={{
          width: "20%",
          borderRight: "1px solid #ddd",
          padding: "1rem",
          background: "#f9f9f9",
        }}
      >
        <h2>Categories</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((cat) => (
              <li
                key={cat._id}
                style={{
                  cursor: "pointer",
                  marginBottom: "0.5rem",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  background:
                    selectedCategory === cat._id ? "#007bff" : "#fff",
                  color: selectedCategory === cat._id ? "#fff" : "#000",
                  transition: "0.3s",
                }}
                onClick={() => fetchProducts(cat._id)}
              >
                {cat.name}
              </li>
            ))
          ) : (
              <p>No categories found</p>
          )}
        </ul>
      </div>

      {/* Right side products */}
      <div className="product-list" style={{ flex: 2, padding: "1rem" }}>
        <h2>Products</h2>
        <Link to="/">home</Link>
        {products.length > 0 ? (
          <div
            className="product-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {products.map((product) => (
              <Product key={product._id} product={product} /> // ✅ استخدام component بتاعك
            ))}
          </div>
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
    </>
  );
}

export default Category;