import './Header.css';
import { RefObject, MouseEvent, useRef } from 'react';
import MilkProduct from '../types';

type Props = {
    cartRef: RefObject<HTMLDivElement>,
    cart: MilkProduct[]
}

const Header = ({cartRef, cart}: Props) => {
    const cartIconRef = useRef<HTMLSpanElement>(null);

    const openCartHandler = (e: MouseEvent<HTMLSpanElement>) => {
        const target = e.target as HTMLElement;
        if (cartRef.current!.className.includes('showCart')) {
            return cartRef.current!.classList.remove('showCart');
        }
        return cartRef.current!.classList.add('showCart');
    }

    return (
        <header className='header'>
            <div className='milkTitle'>
                <h1>M I L K</h1>
                <h1>S T O R E</h1>
            </div>
            <div className='headerMenu'>
                <div className='headerMenuSection'>
                    <span className="material-symbols-outlined personIcon">person</span>
                    <span className='headerMenuText login'>Log in</span>
                </div>
                <div className='headerMenuSection'>
                    <span className="material-symbols-outlined cartIcon" onClick={openCartHandler} ref={cartIconRef}>shopping_bag</span>
                    <span className='headerMenuText number'>{cart.length}</span>
                </div>
            </div>
        </header>
    )
}

export default Header;