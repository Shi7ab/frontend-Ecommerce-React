import React, { useContext } from "react";
import "./customer.css";
import { cartcontext } from "../../../context/contextProvider";
import CartProduct from "../../header/cartItem/cartProduct";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

const Customer: React.FC = () => {
  const cartCtx = useContext(cartcontext);

  if (!cartCtx) {
    throw new Error("cartcontext is null. تأكد من لف التطبيق بـ <CartProvider>");
  }

  const { cart } = cartCtx;
  const navigate = useNavigate();

  // ✅ حساب total price
  const totalPrice = cart.reduce(
    (sum: number, item: Product) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handelCheckout = () => {
    const token = sessionStorage.getItem("token"); // ممكن تخليها localStorage حسب اللوجيك
    if (token) {
      navigate("/checkout/payment");
    } else {
      navigate("/signup");
    }
  };

  const handleContinueShopping = () => {
    navigate("/"); // Assuming you have a route for products
  };

  return (
    <div className="customer-container">
      <h2>Customer Information</h2>
      <div className="customer-info">
        <div>
          <span>Name:</span> {"Guest"}
        </div>
        <div>
          <span>Email:</span> {"Not provided"}
        </div>
        <div>
          <span>Address:</span> {"Not provided"}
        </div>
      </div>

      <h3>Cart Items</h3>
      <div className="customer-cart-list">
        {cart.length > 0 ? (
          cart.map((p: Product) => <CartProduct key={p.id} product={p} />)
        ) : (
          <div className="empty-cart">No items in cart.</div>
        )}
      </div>

      <div className="customer-total">
        <span>Total Items:</span>
        <span>{cart.length}</span>
        <span>Total Price:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>

      <div className="customer-actions">
        <button className="checkout-button" onClick={handelCheckout}>
          Checkout
        </button>
        <button
          className="continue-shopping-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Customer;
