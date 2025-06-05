import { createContext } from "react";
import { useState } from "react";


const UserProgressContext = createContext({
    progress: '',
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
});


export function UserProgressProvider({ children }) {
    const [progress, setProgress] = useState('');

    function showCart() {
        setProgress('cart');
    }
    function hideCart() {
        setProgress('');
    }
    function showCheckout() {
        setProgress('checkout');
    }
    function hideCheckout() {
        setProgress('');
    }

    const userProgressContext = {
        progress: progress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    };

    return (
        <UserProgressContext.Provider value={userProgressContext}>
            {children}
        </UserProgressContext.Provider>
    );
}


export default UserProgressContext;