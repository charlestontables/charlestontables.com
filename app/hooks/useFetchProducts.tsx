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

                const productPromises = productDirs.map(async (dir: { name: string }) => {
                    const productDirUrl = `https://api.github.com/repos/joshualinog/charlestontables/contents/products/${dir.name}`;
                    const productDirResponse = await fetch(productDirUrl);
                    const productFiles = await productDirResponse.json();
                    console.log('Fetched product files:', productFiles); // Debugging log

                    // Filter and order images
                    const images = productFiles
                        .filter((file: { name: string }) => file.name.endsWith('.jpg'))
                        .map((file: { name: string }) => `https://raw.githubusercontent.com/joshualinog/charlestontables/main/products/${dir.name}/${file.name}`);
                    console.log('Ordered images:', images); // Debugging log

                    // Fetch product.json
                    const productJsonUrl = `https://raw.githubusercontent.com/joshualinog/charlestontables/main/products/${dir.name}/product.json`;
                    const productJsonResponse = await fetch(productJsonUrl);
                    const productData = await productJsonResponse.json();
                    console.log('Fetched product data:', productData); // Debugging log

                    // Set main image and images array
                    productData.mainImage = images[0];
                    productData.images = images;

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