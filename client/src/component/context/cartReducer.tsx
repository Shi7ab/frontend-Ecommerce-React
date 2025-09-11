export const totalItem = (cart) => {
    return cart.reduce((sum, product) => sum + product.count , 0)
}

export const totalPrice = (cart) => {
    return cart.reduce((total, product) => total + product.count * product.price , 0)
}

const Reducer = (state, action) => {
     switch(action.type){
        case "Add":
          return [...state, action.Product]
        case "Remove":
          return state.filter(p => p.id !== action.id)
        case "Increase":
          return [state, action.count + 1]
        case "Decrease":
          return [state, action.count - 1]
        default:
            state;
     }
}

export default Reducer;