import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Product from "../products/product";
import { Link } from "react-router-dom";

/**
 * Robust Category component
 * - Normalizes category/product shapes coming from backend
 * - Normalizes IDs to strings (String(id))
 * - Encodes query params
 * - Tries /products?category=ID then falls back to /products?categoryId=ID if first returns empty
 * - Allows clearing selection
 */

type RawResponse = any;

interface CategoryItem {
  _id?: string;
  id?: string;
  name?: string;
  slug?: string;
  [k: string]: any;
}

interface ProductItem {
  _id?: string;
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  category?: string | { _id?: string } | null;
  [k: string]: any;
}

const BASE_URL = "https://backend-ecommerce-nodejs-production.up.railway.app/api/v1";

function toArray(res: RawResponse): any[] {
  // tries many possible shapes and returns an array or empty array
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data?.data)) return res.data.data;
  if (Array.isArray(res.data?.categories)) return res.data.categories;
  if (Array.isArray(res.data?.products)) return res.data.products;
  if (Array.isArray(res.data?.result)) return res.data.result;
  // sometimes backend returns { data: { items: [...] } }
  if (Array.isArray(res.data?.items)) return res.data.items;
  return [];
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // fetch categories (robust)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/categories`);
        const arr = toArray(res);
        if (mounted) setCategories(arr);
      } catch (err) {
        console.error("Error fetching categories:", err);
        if (mounted) setError("Failed to load categories");
      }
    })();
    return () => { mounted = false; };
  }, []);

  // fetch all products by default (robust)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/products`);
        const arr = toArray(res);
        if (mounted) setProducts(arr);
      } catch (err) {
        console.error("Error fetching all products:", err);
        if (mounted) setError("Failed to load products");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // helper: build ID string from possible fields
  const normalizeId = (cat: CategoryItem | string | undefined | null): string | null => {
    if (!cat) return null;
    if (typeof cat === "string") return cat;
    // cat could be object
    const possible = cat as CategoryItem;
    return String(possible._id ?? possible.id ?? possible.slug ?? "").trim() || null;
  };

  // Try fetching products by category; fallback if first call returned empty
  const fetchProducts = useCallback(async (rawCategory: CategoryItem | string) => {
    const id = normalizeId(rawCategory);
    if (!id) {
      console.warn("fetchProducts: could not find category id from:", rawCategory);
      return;
    }

    setLoading(true);
    setError(null);

    // helper to call a URL and return normalized array
    const callAndNormalize = async (url: string) => {
      try {
        const res = await axios.get(url);
        return toArray(res);
      } catch (err) {
        console.warn("fetch error for url", url, err);
        return [];
      }
    };

    // try first param name "category"
    const url1 = `${BASE_URL}/products?category=${encodeURIComponent(id)}`;
    let result = await callAndNormalize(url1);

    // if empty, try "categoryId" param (some backends use that)
    if (!result || result.length === 0) {
      const url2 = `${BASE_URL}/products?categoryId=${encodeURIComponent(id)}`;
      result = await callAndNormalize(url2);
      if (result && result.length > 0) {
        console.info("Fetched products using categoryId param fallback");
      }
    }

    // set products and selectedCategory (normalize to string)
    setProducts(result || []);
    setSelectedCategory(id);
    setLoading(false);

    console.debug("fetchProducts request:", { id, triedUrls: [url1], resultCount: result?.length ?? 0 });
  }, []);

  const clearFilter = () => {
    setSelectedCategory(null);
    setProducts([]); // optional: refetch all
    // refetch all products
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/products`);
        setProducts(toArray(res));
      } catch (err) {
        console.error("Error refetching products:", err);
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
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
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button onClick={clearFilter} style={{ marginBottom: 12 }}>Show all</button>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((cat) => {
              const catId = normalizeId(cat);
              return (
                <li
                  key={catId ?? Math.random()}
                  style={{
                    cursor: "pointer",
                    marginBottom: "0.5rem",
                    padding: "0.5rem",
                    borderRadius: "8px",
                    background: String(selectedCategory) === String(catId) ? "#007bff" : "#fff",
                    color: String(selectedCategory) === String(catId) ? "#fff" : "#000",
                    transition: "0.3s",
                  }}
                  onClick={() => fetchProducts(cat)}
                >
                  {cat.name ?? cat.slug ?? catId}
                </li>
              );
            })
          ) : (
            <p>No categories found</p>
          )}
        </ul>
      </div>

      <div className="product-list" style={{ flex: 2, padding: "1rem" }}>
        <h2>Products</h2>
        <Link to="/">Home</Link>

        {loading ? (
          <p>Loading products...</p>
        ) : products && products.length > 0 ? (
          <div
            className="product-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {products.map((product) => (
              <Product key={product._id ?? product.id} product={product} />
            ))}
          </div>
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}

export default Category;
