import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const found = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if (found) {
        // If the product already exists, increment its quantity
        return cartItems.map(cartItem => {
            if (cartItem.id === productToAdd.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });
    }

    // If the product doesn't exist, add it to the cart
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // updates number of items in cart every time the cartItems array changes
        setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}