import React from 'react';
import Image from 'next/image';
import GalleryLightbox from './GalleryLightbox';

interface ProductShowcaseProps {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    subcategory: string;
    mainImage: string;
    images?: string[];
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({
    name,
    description,
    price,
    currency,
    category,
    subcategory,
    mainImage,
    images = [],
}) => {
    const imageObjects = images.map((url, index) => ({
        id: `${index}`,
        url,
        width: 800,
        height: 600,
    }));

    return (
        <div className="bg-blue-100 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="">
                    <h2 className="text-6xl font-bold text-gray-800 font-medium dark:text-white mb-2 text-center">
                        TABLE <span className="font-mrs lowercase font-thin ">SHOWCASE</span>
                    </h2>
                </div>
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            {mainImage && (
                                <Image
                                    className="w-full h-full object-cover"
                                    src={mainImage}
                                    alt={`Showcase of ${name}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <div className="w-1/2 px-2">
                                <button
                                    type="button"
                                    className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    Add to Cart
                                </button>
                            </div>
                            <div className="w-1/2 px-2">
                                <button
                                    type="button"
                                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                                >
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            {name}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            {description}
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">
                                    Price:
                                </span>
                                <span className="text-gray-600 dark:text-gray-300">
                                    {currency} {price}
                                </span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">
                                    Category:
                                </span>
                                <span className="text-gray-600 dark:text-gray-300">
                                    {category} - {subcategory}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row -mx-4">
                    <GalleryLightbox images={imageObjects} />
                </div>
            </div>
        </div>
    );
};

export default ProductShowcase;