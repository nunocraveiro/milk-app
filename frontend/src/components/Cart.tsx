import { useRef } from 'react';
import { CartProduct } from '../types';
import './Cart.css';
import CartItem from './CartItem';

type Props = {
    cart: CartProduct[],
    setCart: (product: CartProduct[]) => void,
    cartSum: number
}

const Cart = ({cart, setCart, cartSum}: Props) => {
    const totalItemsRef = useRef<HTMLParagraphElement>(null)

    return (
        <div className='cart'>
            <p className='cartTitle'>Shopping cart</p>
            <div className='cartCardsContainer'>
                {cart.length === 0 ? <p className='emptySentence'>Your shopping cart is empty :(</p> : cart.map((item) => <CartItem item={item} cart={cart} setCart={setCart}/>)}
            </div>
            <div className='cartTotalContainer'>
                <p className='cartTotalItems' ref={totalItemsRef}>{cartSum} Items</p>
                <p className='cartTotalCost'>{199*cartSum} kr</p>
            </div>
            <div className='checkoutContainer'>
                <p className='enterCode'>ENTER PROMO CODE</p>
                <div className='codeContainer'>
                    <input className='codeInput' type="text"/>
                    <button className='codeBtn'>Submit</button>
                </div>
                <div className='checkoutInfoContainer'>
                    <p className='checkoutInfo'>Shipping cost</p>
                    <p className='checkoutInfo'>TBD</p>
                </div>
            </div>
        </div>
    )
}

export default Cart;