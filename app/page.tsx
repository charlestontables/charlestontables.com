
import GalleryLightbox from './components/GalleryLightbox';
import HomeHero from './components/HomeHero';
import ProductShowcase from './components/ProductShowcase';


export default function Home() {
  return (
    <div>
      <HomeHero />
      <ProductShowcase productName='test product name' availability='IN STOCK' />
    </div>
  );
}
