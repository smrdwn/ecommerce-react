import { useContext } from 'react';
import { useNavigate } from 'react-router';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {
    CartDropdownContainer,
    EmptyMessage,
    CartItems,
  } from './cart-dropdown.styles';


const CartDropdown = () => {
    const {cartItems, setIsCartOpen} = useContext(CartContext);
    const navigate = useNavigate()

    const goToCheckoutHandler = () => {
        navigate('/checkout');
        setIsCartOpen(false);
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                { cartItems.length ?
                (cartItems.map(item => <CartItem key={item.id} cartItem={item} />))
                : (<EmptyMessage>Your cart is empty</EmptyMessage>)
                }
            </CartItems>
            <Button style={{ marginTop: 'auto' }} onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
}

export default CartDropdown;