import './ProductGrid.css';
import MilkProduct from '../types';
import ProductCard from './ProductCard';

type Props = {
    milkProducts: MilkProduct[];
}

const ProductGrid = ({milkProducts}: Props) => {
    return (
        <section className='productGrid'>
            {milkProducts.map(milkProduct => <ProductCard milkProduct={milkProduct}/>)}
        </section>
    )
}

export default ProductGrid;