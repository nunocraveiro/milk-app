import './Header.css';
import { useRef } from 'react';
import MilkProduct from '../types';
import { useNavigate } from 'react-router-dom';

type Props = {
    cart: MilkProduct[]
}

const Header = ({cart}: Props) => {
    const cartIconRef = useRef<HTMLSpanElement>(null);
    const navigate = useNavigate();

    return (
        <header className='header'>
            <div className='milkTitle' onClick={() => navigate('/')}>
                <h1>M I L K</h1>
                <h1>S T O R E</h1>
            </div>
            <div className='headerMenu'>
                <div className='headerMenuSection'>
                    <span className="material-symbols-outlined personIcon">person</span>
                    <span className='headerMenuText login'>Log in</span>
                </div>
                <div className='headerMenuSection' onClick={() => navigate('/cart')}>
                    <span className="material-symbols-outlined cartIcon" ref={cartIconRef}>shopping_bag</span>
                    <span className='headerMenuText number'>{cart.length}</span>
                </div>
            </div>
        </header>
    )
}

export default Header;