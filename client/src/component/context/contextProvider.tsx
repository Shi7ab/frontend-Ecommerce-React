import { createContext, useContext, useReducer } from "react";
import Reducer from "./cartReducer";
 

 export const cartcontext = createContext({})
 
 const ContextProvider = ({children}) => {
     const [cart,dispatch] = useReducer(Reducer,[])
     window.localStorage.setItem("item",cart)
     window.localStorage.setItem("cart",JSON.stringify(cart))
     console.log(window.localStorage.getItem("item"))
    return (
        <cartcontext.Provider value={{cart,dispatch}}>
            {children}

        </cartcontext.Provider>
    );
}

export default ContextProvider;

export const context = ()=> {
    return useContext(cartcontext)
}