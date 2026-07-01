import { Button } from '@/shared/ui';
import Image from 'next/image';
import popularBanner1 from '@/shared/assets/popular-products-banner-1.png';
import popularBanner2 from '@/shared/assets/popular-products-banner-2.png';
import ipadProBanner from '@/shared/assets/ipad-pro-banner.png';
import samsungGalaxyBanner from '@/shared/assets/samsung-galaxy-banner.png';
import macbookProBanner from '@/shared/assets/macbook-pro.png';

export function PopularProductsSection() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full">
        <div className="relative bg-background text-foreground flex flex-col items-center justify-end gap-4 text-center px-8 py-14 h-auto xl:h-[640px]">
          <div className="absolute w-full h-full top-0 overflow-hidden">
            <Image
              src={popularBanner1}
              alt="Popular Products"
              className="absolute -top-14 left-2 rotate-30 w-[280px] aspect-369/347"
            />
            <Image
              src={popularBanner2}
              alt="Popular Products"
              className="absolute top-11 right-1 -rotate-120 w-[214px] aspect-214/244"
            />
          </div>
          <h3 className="text-4xl text-foreground font-light">
            Popular Products
          </h3>
          <p className="text-sm text-text-muted font-medium max-w-sm">
            Discover our most sought-after tech gadgets, featuring cutting-edge
            smartwatches, premium accessories, and more to elevate your
            lifestyle.
          </p>
          <Button variant="outline" color="black">
            Shop Now
          </Button>
        </div>
        <div className="relative bg-card text-foreground flex flex-col items-center justify-end gap-4 text-center px-8 py-14 h-auto xl:h-[640px]">
          <div className="absolute w-full h-full top-0 overflow-hidden">
            <Image
              src={ipadProBanner}
              alt="Ipad Pro"
              className="absolute -top-13 -right-11 w-[371px] aspect-371/390"
            />
          </div>
          <h3 className="text-4xl font-light z-10">Ipad Pro</h3>
          <p className="text-sm text-text-muted font-medium max-w-sm z-10">
            iPad Pro features a stunning Liquid Retina display, the
            revolutionary M2 chip, and unmatched versatility for professionals
            and creatives.
          </p>
          <Button variant="outline" color="black" className="z-10">
            Shop Now
          </Button>
        </div>
        <div className="relative bg-banner-medium text-foreground flex flex-col items-center justify-end gap-4 text-center px-8 py-14 h-auto xl:h-[640px]">
          <div className="absolute w-full h-full top-0 overflow-hidden">
            <Image
              src={samsungGalaxyBanner}
              alt="Samsung Galaxy"
              className="absolute -top-7 left-0 w-full aspect-359/385"
            />
          </div>
          <h3 className="text-4xl font-light z-10">Samsung Galaxy</h3>
          <p className="text-sm text-text-muted font-medium max-w-sm z-10">
            Experience the next generation of mobile innovation with Galaxy.
            Breathtaking displays, pro-grade cameras, and all-day battery life.
          </p>
          <Button variant="outline" color="black" className="z-10">
            Shop Now
          </Button>
        </div>
        <div className="relative bg-banner-dark text-primary-foreground flex flex-col items-center justify-end gap-4 text-center px-8 py-14 h-auto xl:h-[640px]">
          <div className="absolute w-full h-full top-0 overflow-hidden">
            <Image
              src={macbookProBanner}
              alt="Macbook Pro"
              className="absolute top-8 -right-64 w-[537px] max-w-none"
            />
          </div>
          <h3 className="text-4xl font-light z-10">Macbook Pro</h3>
          <p className="text-sm text-text-muted font-medium max-w-sm z-10">
            MacBook Pro redefines power. Experience mind-blowing performance, a
            brilliant Liquid Retina XDR display, and incredible battery life.
          </p>
          <Button variant="outline" color="white" className="z-10">
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
}
