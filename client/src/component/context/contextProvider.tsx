import { createContext, useContext, useReducer } from "react";
import { CartContextType } from "../types/cart";
import Reducer from "./cartReducer";
 

 export const cartcontext = createContext<CartContextType | null>(null)
 
import { ReactNode } from "react";

type ContextProviderProps = {
    children: ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
    const [cart, dispatch] = useReducer(Reducer, []);
    window.localStorage.setItem("item", cart);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    console.log(window.localStorage.getItem("item"));
    return (
        <cartcontext.Provider value={{ cart, dispatch }}>
            {children}
        </cartcontext.Provider>
    );
}

export default ContextProvider;

export const context = ()=> {
    return useContext(cartcontext)
}