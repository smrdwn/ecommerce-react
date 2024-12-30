import { useContext } from 'react';

import {CartContext} from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
    const {cartItems,totalPrice} = useContext(CartContext);

    return (
      <div className='checkout-container'>
        <div className='checkout-header'>
            <div className="header-block"><span>Product</span></div>
            <div className="header-block"><span>Description</span></div>
            <div className="header-block"><span></span>Quantity</div>
            <div className="header-block"><span></span>Price</div>
            <div className="header-block"><span></span>Remove</div>
        </div>
        {
            cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
        }
        <span className='total'>Total: {totalPrice}</span>
      </div>  
    );
}

export default Checkout;