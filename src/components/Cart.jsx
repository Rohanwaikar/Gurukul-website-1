// import Modal from "./Modal";
// import { useContext } from "react";
// import UserProgressContext from "../store/UserProgressContext";
// import CartContext from "../store/CartContext";
// import CartItem from "./CartItem.jsx";

// export default function Cart() {
//   const userProgressContext = useContext(UserProgressContext);
//   const cartContext = useContext(CartContext);
//   const totalAmount = cartContext.items.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <>
//       <Modal
//         className="cart"
//         open={userProgressContext.progress === "cart"}
//         onClose={userProgressContext.progress === "cart" ? userProgressContext.hideCart : null}
//       >
//         <h2>Your Cart</h2>  
//         <ul className="cart-items">
//           {cartContext.items.length === 0 ? (
//             <p>No items in the cart.</p>
//           ) : (
//             cartContext.items.map((item) => (
//               <CartItem
//                 key={item.id}
//                 item={item}
//                 onRemove={() => cartContext.removeItem(item.id)}
//                 onAdd={() => cartContext.addItem(item)}
//               />
//             ))
//           )}
//         </ul>
//         <p className="cart-total">Total: ${totalAmount}</p>
//         <p className="modal-actions">
//           <button onClick={userProgressContext.hideCart}>Close</button>
//           {
//             cartContext.items.length > 0 && 
//             <button onClick={userProgressContext.showCheckout}>Go to Checkout</button>
//           } 
//         </p>
//       </Modal>
//     </>
//   );
// }
