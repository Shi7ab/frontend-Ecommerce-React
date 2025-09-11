import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

interface Product {
  _id?: string;
  name: string;
  price: number;
  descripe: string;
  image: string;
  category: string;
}

function ManageProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: 0,
    descripe: "",
    image: "",
    category: "",
  });

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/products/");
        setProducts(response.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Add product
  const handleAddProduct = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/create-product", newProduct);
      setProducts([...products, response.data]);
      setNewProduct({ name: "", price: 0, descripe: "", image: "", category: "" });
    } catch (err) {
      console.error("Adding error:", err);
    }
  };

  // ✅ Update product
  const handleUpdate = async (id: string, updatedData: Partial<Product>) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/products/${id}`, updatedData);
      setProducts(products.map((p) => (p._id === id ? response.data : p)));
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // ✅ Delete product
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="manage-container">
      <h2>Manage Products</h2>

      {/* ➕ Add product form */}
      <div className="add-product-form">
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
        />
        <textarea
          placeholder="Description"
          value={newProduct.descripe}
          onChange={(e) => setNewProduct({ ...newProduct, descripe: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Books">Books</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothes">Clothes</option>
        </select>
        <button onClick={handleAddProduct}>➕ Add Product</button>
      </div>

      {/* 📦 Product List */}
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>${product.price}</p>
              <p>{product.descripe}</p>
              <span className="category">{product.category}</span>
              <div className="card-actions">
                <button
                  onClick={() =>
                    handleUpdate(product._id!, {
                      name: product.name + " (Updated)",
                    })
                  }
                >
                  ✏️ Update
                </button>
                <button onClick={() => handleDelete(product._id!)}>🗑️ Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}

export default ManageProduct;
