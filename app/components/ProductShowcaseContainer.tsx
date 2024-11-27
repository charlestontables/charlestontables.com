import type React from 'react';
import ProductShowcase from './ProductShowcase';
import useFetchProducts from '../hooks/useFetchProducts';

const ProductShowcaseContainer: React.FC = () => {
    const { products, loading, error } = useFetchProducts();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    console.log('Products to render:', products); // Debugging log

    return (
        <div>
            {products.map((product) => (
                <ProductShowcase key={product.id} {...product} />
            ))}
        </div>
    );
};

export default ProductShowcaseContainer;