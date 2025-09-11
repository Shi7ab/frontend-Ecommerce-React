import { useContext } from 'react';
import { cartcontext } from '../../context/contextProvider';
import './product.css'


interface ProductProps {
    product: {
        image: string;
        name: string;
        descripe: string;
        price: number;
        // add other fields if needed
    };
}

function Product({ product }: ProductProps) {   
    const cartCtx = useContext(cartcontext);
    if (!cartCtx) {
        throw new Error("cartcontext is null. Make sure your component is wrapped in the context provider.");
    }
    const { dispatch } = cartCtx;
    //   console.log(cart);
      
    return (
        <div className="product">
      
            <img src={product.image} alt="" />

            <h2> {product.name}</h2>
            <p>product description{product.descripe}</p><br />
            <p>{product.price}</p>
  
               <button onClick={()=> dispatch({type:"Add",Product:product})}>add cart</button>  
               
             {/* <button>Add To cart</button>  */}
        </div>
    );
}

export default Product;