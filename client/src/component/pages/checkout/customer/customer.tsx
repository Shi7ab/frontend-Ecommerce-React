import React, { useContext } from "react";
import "./customer.css";
import { cartcontext } from '../../../context/contextProvider';
import CartProduct from '../../header/cartItem/cartProduct';
import { useNavigate } from 'react-router-dom';

const Customer = () => {
  const { cart } = useContext(cartcontext);
  const navigate = useNavigate();

  // Calculate total price
  // const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);
 const handelcheckout = () => {
    // const token = localStorage.getItem('token');
    const token = sessionStorage.getItem('token')
    if (token) {
        navigate('/checkout/payment');
    } else {
        navigate('/signup');
    }
  }
  const handleContinueShopping = () => {
    navigate('/'); // Assuming you have a route for products
  }
  return (
    <div className="customer-container">
      <h2>Customer Information</h2>
      <div className="customer-info">
        <div><span>Name:</span> {"Guest"}</div>
        <div><span>Email:</span> {  "Not provided"}</div>
        <div><span>Address:</span> { "Not provided"}</div>
      </div>
      <h3>Cart Items</h3>
      <div className="customer-cart-list">
        {cart.length > 0 ? (
          cart.map((p) => <CartProduct   product={p} />)
        ) : (
          <div className="empty-cart">No items in cart.</div>
        )}
      </div>
      <div className="customer-total">
        <span>Total Items:</span>
        <span>{cart.length}</span>
        <span>Total Price:</span>
        <span>${}</span>
      </div>
      <div className="customer-actions">
        <button className="checkout-button" onClick={handelcheckout}>Checkout</button>
        <button className="continue-shopping-button" onClick={handleContinueShopping}>Continue Shopping</button>
    </div>
    </div>
  );
};

export default Customer;