import {
  CategoriesBrowserSection,
  CategoryBannersSection,
  DiscountProductsSection,
  HeroSection,
  PopularProductsSection,
  ProductTabsSection,
  SaleBannerSection,
} from './_ui/home';

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
