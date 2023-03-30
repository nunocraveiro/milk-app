import MilkProduct from '../types';
import './Cart.css';
import milkImg from '../milk.png';

type Props = {
    cart: MilkProduct[]
}

const Cart = ({cart}: Props) => {
    return (
        <div className='cart'>
            <p>Shopping cart</p>
            <div className='cartBody'>
                <div className='cartCardsContainer'>
                    {cart.map((product) => 
                        <div className='cartCard'>
                            <img className='milkImg' src={milkImg} alt="milk pack" />
                        </div>
                    )}
                </div>
                <div className='checkoutColumn'>
                    
                </div>
            </div>
        </div>
    )
}

export default Cart;