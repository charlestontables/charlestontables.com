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
        console.log('useFetchProducts hook called'); // Initial log statement

        const fetchProducts = async () => {
            try {
                const repoUrl = 'https://api.github.com/repos/joshualinog/charlestontables/contents/products';
                console.log('Fetching product directories from:', repoUrl); // Debugging log
                const response = await fetch(repoUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch product directories: ${response.statusText}`);
                }
                const productDirs = await response.json();
                console.log('Fetched product directories:', productDirs); // Debugging log

                const productPromises = productDirs.map(async (dir: any) => {
                    try {
                        const productUrl = `https://raw.githubusercontent.com/joshualinog/charlestontables/main/products/${dir.name}/product.json`;
                        console.log('Fetching product data from:', productUrl); // Debugging log
                        const productResponse = await fetch(productUrl);
                        if (!productResponse.ok) {
                            throw new Error(`Failed to fetch product data for ${dir.name}: ${productResponse.statusText}`);
                        }
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
                    } catch (err) {
                        console.error(`Error fetching product data for ${dir.name}:`, err);
                        return null;
                    }
                });

                const products = await Promise.all(productPromises);
                console.log('Fetched products:', products); // Debugging log
                setProducts(products.filter(Boolean));
            } catch (err) {
                console.error('Error fetching products:', err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

export default useFetchProducts;