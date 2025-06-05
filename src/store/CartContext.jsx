// import { createContext, useReducer } from "react";


// const CartContext = createContext({
//         items: [],
//         addItem: (item) => {},
//         removeItem: (id) => {},
//         clearCart: () => {},
//     });

// function cartReducer(state, action) {
//     if( action.type === 'ADD_ITEM') {
//         const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id); 
//         const updatedItems = [...state.items]; // Create a copy of the current items in the cart
//         if(existingCartItemIndex >= 0){
//             const existingCartItem = state.items[existingCartItemIndex]; // Get the existing item from the cart
//             const updatedItem =  {
//                 ...existingCartItem,
//                 quantity: existingCartItem.quantity + 1,
//             };
//             updatedItems[existingCartItemIndex] = updatedItem; // Update the existing item with the new quantity
//         }
//         else {
//             updatedItems.push({ ...action.item, quantity: 1 }); // If the item is not in the cart, add it with a quantity of 1
//         }
//     return {
//         ...state, // Spread the current state to keep other properties intact
//         items: updatedItems, // Update the items in the cart with the new or updated item
//     };
// }
//     if( action.type === 'REMOVE_ITEM') {
//          const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id); // Find the index of the item to be removed
//          if(existingCartItemIndex < 0){
//             return state; // If the item is not found, return the current state
//          }
//          const existingCartItem = state.items[existingCartItemIndex]; // Get the existing item from the cart
//          const updatedItems = [...state.items]; // Create a copy of the current items in the cart
//             if(existingCartItem.quantity === 1) {
//                 updatedItems.splice(existingCartItemIndex, 1); // If the quantity is 1, remove the item from the cart

//             }
//             else {
//                 const updatedItem = {
//                     ...existingCartItem,
//                     quantity: existingCartItem.quantity - 1, // Decrease the quantity by 1
//                 };
//                 updatedItems[existingCartItemIndex] = updatedItem; // Update the existing item with the new quantity
//             }
//             return {
//                 ...state, // Spread the current state to keep other properties intact
//                 items: updatedItems, // Update the items in the cart with the new or updated item
//             };
//     }
//     if( action.type === 'CLEAR_CART') {
//         return {
//             items: [], // Clear the cart by returning an empty array of items
//         };
//     }
//     return state;
// }

// export function CartProvider({ children }) {

//     const [cartState, dispatchCartAction] = useReducer(cartReducer, {
//         items: [],
//     });
//     const addItemToCartHandler = (item) => {
//         dispatchCartAction({ type: 'ADD_ITEM', item: item });
//     };
//     const removeItemFromCartHandler = (id) => {
//         dispatchCartAction({ type: 'REMOVE_ITEM', id: id });
//     };
//     const clearCartHandler = () => {
//         dispatchCartAction({ type: 'CLEAR_CART' });
//     };

//     const cartContext = {
//         items: cartState.items,
//         addItem: addItemToCartHandler,
//         removeItem: removeItemFromCartHandler,
//         clearCart: clearCartHandler,
//     };


//     return(
//         <CartContext.Provider value={cartContext}>
//             {children}
//         </CartContext.Provider>
//     )
// }

// export default CartContext;