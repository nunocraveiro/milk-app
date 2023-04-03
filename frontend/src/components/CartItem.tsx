import './CartItem.css';
import { CartProduct } from "../types";
import milkImg from '../milk.png';

type Props = {
    item: CartProduct,
    cart: CartProduct[],
    setCart: (product: CartProduct[]) => void
}

const CardItem = ({item, cart, setCart}: Props) => {

    const handleDecrease = () => {
        if (item.quantity === 1) return;
        const newCart = cart.map((cartItem) => {
            if (cartItem === item) {
                return {...cartItem, quantity: cartItem.quantity-1}
            }
            return cartItem;
        })
        return setCart(newCart);
    }

    const handleIncrease = () => {
        if (item.quantity === 5) return;
        const newCart = cart.map((cartItem) => {
            if (cartItem === item) {
                return {...cartItem, quantity: cartItem.quantity+1}
            }
            return cartItem;
        });
        console.log(newCart)
        setCart(newCart);
    }

    const handleDelete = () => {
        return setCart(cart.filter((cartItem) => cartItem !== item));
    }

    return (
        <div className='cartCard'>
            <img className='milkImg' src={milkImg} alt="milk pack" />
            <div className='cartProductInfo'>
                <p className='cartProductName'>{item.product.name}</p>
                <p className='restInfo'>{item.product.type}</p>
                <p className='restInfo'>44 liters</p>
                <p className='restInfo'>In Stock</p>
            </div>
            <div className='infoContainer'>
                <p>Each</p>
                <p className='boldInfo'>199 kr</p>
            </div>
            <div className='infoContainer'>
                <p>Quantity</p>
                <div className='quantityButtons'><span className='quantityButton' onClick={handleDecrease}>-</span><span className='itemQuantity'>{item.quantity}</span><span className='quantityButton' onClick={handleIncrease}>+</span></div>
            </div>
            <div className='infoContainer'>
                <p>Total</p>
                <p className='boldInfo'>{199*item.quantity} kr</p>
            </div>
            <div className='infoContainer'>
            <span className="material-symbols-outlined cartDelete" onClick={handleDelete}>delete</span>
            </div>
        </div>
    )
}

export default CardItem;