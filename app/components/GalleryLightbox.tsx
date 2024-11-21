"use client";
// components/GalleryLightbox.tsx
import type React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Thumbs, EffectFade } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

interface ImageType {
    id: string;
    url: string;
    width: number;
    height: number;
}

interface GalleryLightboxProps {
    mainImage: ImageType;
    images: ImageType[];
}

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ mainImage, images }) => {
    SwiperCore.use([Thumbs, EffectFade]);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState('');

    const openLightbox = (src: string) => {
        setLightboxImage(src);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    return (
        <section className="py-24 relative">
            <div className="mx-auto px-4 sm:px-5 lg:px-6">
                <div className="mb-16">
                    <h2 className="w-full text-center text-gray-900 text-4xl font-bold font-manrope leading-normal pb-2.5">Our Gallery</h2>
                    <p className="w-full text-center text-gray-600 text-lg font-normal leading-8">Explore the essence of beauty in our gallery&apos;s intimate space.</p>
                </div>
                <div className="flex flex-col-reverse gap-8 mx-auto">
                    <div className="slider-box flex flex-col xl:flex-row gap-8">
                        <div className="box xl:w-[1062px] w-full gallery">
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={30}
                                slidesPerView={4}
                                loop={true}
                                className="nav-for-slider"
                            >
                                <SwiperSlide key={mainImage.id} className="thumbs-slide lg:!w-[126px] md:!h-[135px] w-full h-[110px]">
                                    <Image
                                        src={mainImage.url}
                                        alt="Main gallery item"
                                        width={mainImage.width}
                                        height={mainImage.height}
                                        className="gallery-image w-full cursor-pointer h-full rounded-2xl border-2 border-gray-200 transition-all duration-500 hover:border-indigo-600 object-cover"
                                        onClick={() => openLightbox(mainImage.url)}
                                        onKeyUp={(e) => e.key === 'Enter' && openLightbox(mainImage.url)}
                                        tabIndex={0}
                                    />
                                </SwiperSlide>
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
                                            tabIndex={0}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="xl:w-[126px] w-full">
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={1}
                                effect="fade"
                                thumbs={{ swiper: thumbsSwiper }}
                                className="main-slide-carousel"
                            >
                                <SwiperSlide key={mainImage.id}>
                                    <div className="block xl:w-[1062px] w-full mx-auto h-[627px] rounded-3xl">
                                        <Image
                                            src={mainImage.url}
                                            alt="Main gallery item"
                                            width={mainImage.width}
                                            height={mainImage.height}
                                            className="gallery-image w-full h-full mx-auto rounded-3xl object-cover"
                                        />
                                    </div>
                                </SwiperSlide>
                                {images.map((src) => (
                                    <SwiperSlide key={src.id}>
                                        <div className="block xl:w-[1062px] w-full mx-auto h-[627px] rounded-3xl">
                                            <Image
                                                src={src.url}
                                                alt="Gallery item"
                                                width={src.width}
                                                height={src.height}
                                                className="gallery-image w-full h-full mx-auto rounded-3xl object-cover"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            {lightboxOpen && (
                <div
                    className="lightbox"
                    onClick={closeLightbox}
                    onKeyUp={(e) => e.key === 'Enter' && closeLightbox()}
                    role="button"
                    tabIndex={0}
                >
                    <span
                        className="close"
                        onClick={closeLightbox}
                        onKeyUp={(e) => e.key === 'Enter' && closeLightbox()}
                        role="button"
                        tabIndex={0}
                    >
                        &times;
                    </span>
                    <Image src={lightboxImage} alt="Lightbox" width={800} height={600} className="lightbox-image" />
                </div>
            )}
            <style jsx>{`
                .lightbox {
                    display: flex;
                    position: fixed;
                    z-index: 999;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    overflow: hidden;
                    background-color: rgba(0, 0, 0, 0.8);
                    justify-content: center;
                    align-items: center;
                }
                .lightbox-image {
                    max-width: 100%;
                    max-height: 100%;
                }
                .close {
                    color: #fff;
                    font-size: 3em;
                    position: absolute;
                    top: 20px;
                    right: 30px;
                    cursor: pointer;
                }
            `}</style>
        </section>
    );
};

export default GalleryLightbox;