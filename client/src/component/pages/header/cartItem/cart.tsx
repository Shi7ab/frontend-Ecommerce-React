//  import { product } from '../../../productData';
import { useContext} from 'react';
// import { PRODUCT } from '../../../productData';
import { cartcontext } from '../../../context/contextProvider';
import CartProduct from './cartProduct';
import './cart.css'
import { totalItem, totalPrice } from '../../../context/cartReducer';
import { useNavigate } from 'react-router-dom';

function Cart() {
    
    const { cart } = useContext(cartcontext)
    window.scrollTo(0, 0);
    const navigate = useNavigate();
     
    const handleCheckout = () => {
        // const token = localStorage.getItem('token');
        const token = sessionStorage.getItem('token')
        if (token) {
            navigate('/checkout');
        } else {
            navigate('/signup');
        }
    };

    
    return (
        <div className="cart-sectionn" style={{ }}>
            <div className="title">Cart Items</div> 
            <div className="cart">
                {cart != 0 ? (cart.map((p)=>
          
                   <CartProduct product={p}/>
                    
                )):(
                  <h1 style={{padding:"20px",textAlign:"center",fontFamily:"sans-serif",color:"rgb(28, 21, 90)"}}>No Items </h1>
                )}  

            <div className="chuck-out">
                <p>total Items:{totalItem(cart)} Total Price: ${totalPrice(cart)}</p>
                <button onClick={handleCheckout}>check out</button>
            </div>
            </div>
        </div>
    );
}


export default Cart;