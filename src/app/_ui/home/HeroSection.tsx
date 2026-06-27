import { Container } from '@/shared/ui';
import { Button } from '@/shared/ui';
import Image from 'next/image';
import iphoneImage from '@/shared/assets/iphone-image.png';

export function HeroSection() {
  return (
    <section className="bg-[#211C24] overflow-hidden">
      <Container className="flex items-center justify-between gap-12">
        <div className="flex-1 flex flex-col items-center gap-6 md:items-start text-center md:text-left z-10 h-full">
          <h2 className="text-background opacity-40 text-2xl font-figtree font-semibold">
            Pro.Beyond.
          </h2>
          <h1 className="text-background text-7xl md:text-8xl font-thin tracking-tighter">
            IPhone 14 <span className="font-bold">Pro</span>
          </h1>
          <p className="text-[#909090] text-lg font-medium">
            Created to change everything for the better. For everyone.
          </p>
          <Button variant="outline" color="white">
            Shop Now
          </Button>
        </div>

        <div className="flex-1 w-full flex justify-center md:justify-end relative h-[400px] md:h-[632px]">
          <div className="absolute bottom-0 w-[80%] md:w-[400px] h-full flex items-end justify-center">
            <Image
              src={iphoneImage}
              alt="iPhone 14 Pro"
              className="w-full h-auto max-h-full object-contain"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
