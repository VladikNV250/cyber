import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
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
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoryBannersSection />
        <CategoriesBrowserSection />
        <ProductTabsSection />
        <PopularProductsSection />
        <DiscountProductsSection />
        <SaleBannerSection />
      </main>
      <Footer />
    </>
  );
}
