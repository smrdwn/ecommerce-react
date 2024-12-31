import { createContext, useReducer } from 'react';

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

const removeCartItem = (cartItems, productToRemove) => {
    if (productToRemove.quantity > 1) {
        return cartItems.map(cartItem => {
            if (cartItem.id === productToRemove.id) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
        });
    }

    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
};

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

const calculateCartCount = (cartItems) => 
    cartItems.reduce((acc, item) => acc + item.quantity, 0);

const calculateTotalPrice = (cartItems) => 
    cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);



export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    totalPrice: 0,
});

export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
    REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
    CLEAR_ITEM_FROM_CART: 'CLEAR_ITEM_FROM_CART',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_TOTAL_PRICE: 'SET_TOTAL_PRICE'
};

const cartReducer = (state, action) => {
    const {type, payload} = action;
    let updatedCartItems;

    switch(type) {
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return { ...state, isCartOpen: payload }
        case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
            updatedCartItems = addCartItem(state.cartItems, payload.productToAdd);
            return { 
                ...state, 
                cartItems: updatedCartItems,
                cartCount: calculateCartCount(updatedCartItems),
                totalPrice: calculateTotalPrice(updatedCartItems), 
            }
        case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
            updatedCartItems = removeCartItem(state.cartItems, action.payload.productToRemove);
            return { 
                ...state, 
                cartItems: updatedCartItems,
                cartCount: calculateCartCount(updatedCartItems),
                totalPrice: calculateTotalPrice(updatedCartItems), 
            }
        case CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART:
            updatedCartItems = clearCartItem(state.cartItems, action.payload.cartItemToClear);
            return { 
                ...state, 
                cartItems: updatedCartItems,
                cartCount: calculateCartCount(updatedCartItems),
                totalPrice: calculateTotalPrice(updatedCartItems),
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    totalPrice: 0,
}


export const CartProvider = ({ children }) => {
    const [{ isCartOpen, cartItems, cartCount, totalPrice }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const setIsCartOpen = (bool) => {
        dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
    }

    const addItemToCart = (productToAdd) => {
        dispatch({ type: CART_ACTION_TYPES.ADD_ITEM_TO_CART, payload: { productToAdd } })
    }

    const removeItemFromCart = (productToRemove) => {
        dispatch({ type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART, payload: { productToRemove } });
    }

    const clearItemFromCart = (cartItemToClear) => {
        // clearing the whole product from cart
        dispatch({ type: CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART, payload: { cartItemToClear } });
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        removeItemFromCart, 
        clearItemFromCart, 
        totalPrice
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}