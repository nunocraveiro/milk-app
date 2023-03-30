import { useParams } from 'react-router-dom';
import MilkProduct from '../types';
import './ProductPage.css';
import milkImg from '../milk.png';

type Props = {
    milks: MilkProduct[],
    cart: MilkProduct[],
    setCart: (product: MilkProduct[]) => void
}

const ProductPage = ({milks, cart, setCart}: Props) => {
    const params = useParams();
    const product = milks.find((milk) => milk.id === params.productId);

    return (
        <div className='productPage'>
            <img className='milkImg' src={milkImg} alt="milk pack" />
            <div className='productText'>
                <h2>{product!.name}</h2>
                <p>{product!.type}</p>
                <button className='addBtn' onClick={() => setCart([...cart, product!])}>Add to cart</button>
            </div>
        </div>
    )
}

export default ProductPage;