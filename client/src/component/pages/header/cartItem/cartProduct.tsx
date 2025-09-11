import { useContext } from "react";
import { cartcontext } from "../../../context/contextProvider";
import "./cart.css";

// 📌 عرّف type للـ Product
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

// 📌 Props للـ component
interface CartProductProps {
  product: Product;
}

function CartProduct({ product }: CartProductProps) {
  const cartCtx = useContext(cartcontext);

  if (!cartCtx) {
    throw new Error("cartcontext is null. Make sure CartProvider is used.");
  }

  const { dispatch } = cartCtx;
  const count = 0;

  return (
    <div className="cart-menu">
      <div className="item">
        <img src={product.image} alt={product.name} />
        <p>name: {product.name}</p>
        <p>price: {product.price}$</p>

        <div className="countinty">
          <button onClick={() => dispatch({ type: "Add" })}>+</button>
          <span>{count}</span>
          <button onClick={() => dispatch({ type: "Decrease" })}>-</button>
        </div>

        <button
          className="ic"
          onClick={() => dispatch({ type: "Remove", id: product.id })}
        >
          <svg
            fill=""
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,
            1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CartProduct;
