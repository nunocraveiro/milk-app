import './ProductCard.css';
import { MilkProduct } from '../types';
import milkImg from '../milk.png';
import { useNavigate } from 'react-router-dom';

type Props = {
    milkProduct: MilkProduct;
}

const ProductCard = ({milkProduct}: Props) => {
    const navigate = useNavigate();

    return (
        <div className='productCard' onClick={() => navigate(`/${milkProduct.id}`)}>
            <img className='milkImg' src={milkImg} alt="milk pack" />
            <section className='cardText'>
                <p className='productName'>{milkProduct.name}</p>
                <section className='typePrice'>
                    <p>{milkProduct.type}</p>
                    <p className='liters'>44 liter</p>
                </section>
            </section>
        </div>
    )
}

export default ProductCard;