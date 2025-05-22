import { createContext, useContext, useState, useEffect } from "react";
const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Error: ", error);
            return [];
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch(error) {
            console.error("Error: ", error);
        }
    }, [cartItems]);

    function addToCart(product) {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1} : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1}]
            }
        });
        alert(`${product.name} добавлен в корзину!`);
    }

    function removeFromCart(productId) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
        alert("Товар удален из корзины!");
    }

    function increaseQuantity(productId) {
        setCartItems(prevItems => prevItems.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
    }

    function decreaseQuantity(productId) {
        setCartItems(prevItems => prevItems.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item)).filter(item => item.quantity > 0)
    }

    function clearCart () {
        setCartItems([]);
    }

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalQuantity,
        totalPrice,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
} 

