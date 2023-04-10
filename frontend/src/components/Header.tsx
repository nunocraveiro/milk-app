import './Header.css';
import { useRef, RefObject } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    cartSum: number,
    headerRef: RefObject<HTMLElement>
}

const Header = ({cartSum, headerRef}: Props) => {
    const cartIconRef = useRef<HTMLSpanElement>(null);
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
        window.location.reload();
    }

    return (
        <header className='header' ref={headerRef}>
            <div className='milkTitle' onClick={goHome}>
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
                    <span className='headerMenuText number'>{cartSum}</span>
                </div>
            </div>
        </header>
    )
}

export default Header;