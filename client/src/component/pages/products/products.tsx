// import React, { createContext, useContext, useState } from 'react';
import Product from './product';
// import { PRODUCT } from '../../../data/productData';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './product.css'

 
 
function Products() {

  // const [products, setproducts] = useState(PRODUCT)
  const [products, setProducts] = useState();
 

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/products');
      setProducts(response.data.products);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

   
  return (
    <div className='row'>
    
      {Array.isArray(products) && products.length > 0 ? (
        products.map((p) => (
          <Product key={p._id || p.id} product={p} />
        ))
      ) : (
        <h2 style={{ textAlign: 'center', width: '100%' }}>No products found.</h2>
      )}
      
    </div>
  );
}

export default Products;