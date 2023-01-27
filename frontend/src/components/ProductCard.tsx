import './ProductCard.css';
import MilkProduct from '../types';
import milkImg from '../milk.png';

type Props = {
    milkProduct: MilkProduct;
}

const ProductCard = ({milkProduct}: Props) => {
    return (
        <div className='productCard'>
            <img className='milkImg' src={milkImg} alt="milk pack" />
            {/* <p>44 liters</p> */}
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