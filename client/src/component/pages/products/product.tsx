import { useContext } from 'react';
import { cartcontext } from '../../context/contextProvider';
import './product.css'


function Product({product}) {   
     const { dispatch } = useContext(cartcontext); 
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