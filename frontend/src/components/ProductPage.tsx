import { useParams } from 'react-router-dom';
import { MilkProduct, CartProduct } from '../types';
import './ProductPage.css';
import milkImg from '../milk.png';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

type Props = {
    milks: MilkProduct[],
    cart: CartProduct[],
    setCart: (product: CartProduct[]) => void
}

const ProductPage = ({milks, cart, setCart}: Props) => {
    const params = useParams();
    const [product, setProduct] = useState<MilkProduct>({});
    const quantityRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const getData = () => {
          axios.get('http://localhost:3001/')
          .then(res => {
            setProduct(res.data.results.find((milk: MilkProduct) => milk.id === params.productId));
          })
          .catch(err => {
            console.log(err);
          })
        }
        getData();
      }, [])

    const handleDecrease = () => {
        if (quantityRef.current!.innerHTML === '1') return;
        return quantityRef.current!.innerHTML = (Number(quantityRef.current!.innerHTML)-1).toString();
    }

    const handleIncrease = () => {
        if (quantityRef.current!.innerHTML === '5') return;
        return quantityRef.current!.innerHTML = (Number(quantityRef.current!.innerHTML)+1).toString();
    }

    const addToCartHandler = () => {
        const productIndex = cart.findIndex((item) => item.product === product);
        if (productIndex !== -1) {
            if (cart[productIndex].quantity === 5) return;
            const newCart = cart.map((item) => {
                if (item.product === product) {
                    return {...item, quantity: item.quantity + Number(quantityRef.current!.innerHTML)}
                }
                return item;
            })
            return setCart(newCart);
        }
        return setCart([...cart, {product: product!, quantity: Number(quantityRef.current!.innerHTML)}]);
    }

    return (
        <div className='productPage'>
            <img className='milkImg' src={milkImg} alt="milk pack" />
            <div className='productText'>
                <h2>{product!.name}</h2>
                <p>{product!.type}<span className='productLiters'>44 liters</span><span className='price'>199 kr.</span></p>
                <div className='addContainer'>
                    <div className='quantityButtons'><span className='quantityButton' onClick={handleDecrease}>-</span><span className='itemQuantity' ref={quantityRef}>1</span><span className='quantityButton' onClick={handleIncrease}>+</span></div>
                    <button className='addBtn' onClick={addToCartHandler}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage;