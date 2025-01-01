import { useSelector } from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return (
      <CheckoutContainer>
        <CheckoutHeader>
            <HeaderBlock><span>Product</span></HeaderBlock>
            <HeaderBlock><span>Description</span></HeaderBlock>
            <HeaderBlock><span></span>Quantity</HeaderBlock>
            <HeaderBlock><span></span>Price</HeaderBlock>
            <HeaderBlock><span></span>Remove</HeaderBlock>
        </CheckoutHeader>
        {
            cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
        }
        <Total>Total: {cartTotal}</Total>
      </CheckoutContainer>  
    );
}

export default Checkout;