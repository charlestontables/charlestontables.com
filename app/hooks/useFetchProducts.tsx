import { useState, useEffect } from 'react';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    subcategory: string;
    mainImage: string;
    images: string[];
}

const useFetchProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const repoUrl = 'https://api.github.com/repos/joshualinog/charlestontables/contents/products';
                const response = await fetch(repoUrl);
                const productDirs = await response.json();
                console.log('Fetched product directories:', productDirs); // Debugging log

                const productPromises = productDirs.map(async (dir: any) => {
                    const productUrl = `https://raw.githubusercontent.com/joshualinog/charlestontables/main/products/${dir.name}/product.json`;
                    const productResponse = await fetch(productUrl);
                    const productData = await productResponse.json();
                    console.log('Fetched product data:', productData); // Debugging log

                    // Fetch images
                    const images = productData.images.map((image: string) => {
                        return `https://raw.githubusercontent.com/joshualinog/charlestontables/main/products/${dir.name}/${image}`;
                    });
                    productData.images = images;

                    // Set main image URL
                    productData.mainImage = `https://raw.githubusercontent.com/joshualinog/charlestontables/main/products/${dir.name}/${productData.mainImage}`;

                    return productData;
                });

                const products = await Promise.all(productPromises);
                console.log('Fetched products:', products); // Debugging log
                setProducts(products);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

export default useFetchProducts;