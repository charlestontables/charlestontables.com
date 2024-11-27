import type React from 'react';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';

interface GalleryLightboxProps {
    images: { id: string; url: string; width: number; height: number }[];
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ images }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);

    const openLightbox = (url: string) => {
        setCurrentImage(url);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    return (
        <section className="py-24 relative">
            <div className="mx-auto px-4 sm:px-5 lg:px-6">
                <div className="mb-16">
                    <h2 className="w-full text-center text-gray-900 text-4xl font-bold font-manrope leading-normal pb-2.5">
                        Our Gallery
                    </h2>
                    <p className="w-full text-center text-gray-600 text-lg font-normal leading-8">
                        Explore the essence of beauty in our gallery&apos;s intimate space.
                    </p>
                </div>
                <div className="flex flex-col-reverse gap-8 mx-auto">
                    <div className="slider-box flex flex-col xl:flex-row gap-8">
                        <div className="box xl:w-[1062px] w-full gallery">
                            <Swiper spaceBetween={30} slidesPerView={4} loop={true} className="nav-for-slider">
                                {images.map((src) => (
                                    <SwiperSlide key={src.id} className="thumbs-slide lg:!w-[126px] md:!h-[135px] w-full h-[110px]">
                                        <Image
                                            src={src.url}
                                            alt="Gallery item"
                                            width={src.width}
                                            height={src.height}
                                            className="gallery-image w-full cursor-pointer h-full rounded-2xl border-2 border-gray-200 transition-all duration-500 hover:border-indigo-600 object-cover"
                                            onClick={() => openLightbox(src.url)}
                                            onKeyUp={(e) => e.key === 'Enter' && openLightbox(src.url)}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
                {lightboxOpen && currentImage && (
                    <div className="lightbox">
                        <div className="lightbox-content">
                            <Image src={currentImage} alt="Current" layout="fill" objectFit="contain" />
                            <button type='button' onClick={closeLightbox}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GalleryLightbox;