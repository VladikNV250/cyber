import { CategoriesBrowserSection } from './_ui/CategoriesBrowserSection';
import { CategoryBannersSection } from './_ui/CategoryBannersSection';
import { DiscountProductsSection } from './_ui/DiscountProductsSection';
import { HeroSection } from './_ui/HeroSection';
import { PopularProductsSection } from './_ui/PopularProductsSection';
import { ProductTabsSection } from './_ui/ProductTabsSection';
import { SaleBannerSection } from './_ui/SaleBannerSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryBannersSection />
      <CategoriesBrowserSection />
      <ProductTabsSection />
      <PopularProductsSection />
      <DiscountProductsSection />
      <SaleBannerSection />
    </>
  );
}
