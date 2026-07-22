import { Button } from '@/shared/ui';
import Image from 'next/image';
import Link from 'next/link';
import playstationImg from '@/shared/assets/playstation.png';
import macbookImg from '@/shared/assets/macbook-pro.png';
import airpodsImg from '@/shared/assets/airpods-max.png';
import visionProImg from '@/shared/assets/apple-vision-pro.png';

export function CategoryBannersSection() {
  return (
    <section className="w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-[328px_272px] w-full h-auto">
        <div className="col-span-1 md:col-span-2 xl:col-span-2 bg-background flex items-center justify-end overflow-hidden border-b border-border xl:border-r relative min-h-[300px] p-12">
          <Link href="/catalog/gaming" className="absolute inset-0 z-20">
            <span className="sr-only">Playstation 5</span>
          </Link>
          <div className="absolute -left-38 top-0 h-full w-auto overflow-hidden">
            <Image
              src={playstationImg}
              alt="Playstation 5"
              className="h-[343px] w-[513px] max-w-none"
            />
          </div>
          <div className="flex flex-col justify-between gap-4 text-left z-10">
            <h2 className="text-5xl font-medium text-foreground">
              Playstation 5
            </h2>
            <p className="text-text-muted font-medium text-sm max-w-xs">
              Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
              will redefine your PlayStation experience.
            </p>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 xl:col-span-2 xl:row-span-2 bg-banner-light flex items-center p-8 md:p-12 relative overflow-hidden min-h-[400px]">
          <div className="flex flex-col items-start text-left gap-4 max-w-sm z-10 relative">
            <h2 className="text-6xl font-thin text-foreground">
              Macbook <span className="font-medium">Air</span>
            </h2>
            <p className="text-text-muted text-sm font-medium">
              The new 15‑inch MacBook Air makes room for more of what you love
              with a spacious Liquid Retina display.
            </p>
            <Button variant="outline" color="black" asChild>
              <Link href="/catalog/computers">Shop Now</Link>
            </Button>
          </div>
          <Image
            src={macbookImg}
            alt="Macbook"
            className="absolute w-[829px] h-[502px] max-w-none -right-134"
          />
        </div>

        <div className="col-span-1 bg-banner-light flex items-center justify-end relative overflow-hidden p-12 border-b md:border-b-0 border-border md:border-r min-h-[250px]">
          <Link href="/catalog/headphones" className="absolute inset-0 z-20">
            <span className="sr-only">Apple AirPods Max</span>
          </Link>
          <div className="absolute -left-35 top-0 h-full w-auto">
            <Image
              src={airpodsImg}
              alt="Apple AirPods Max"
              className="w-[245px] h-[272px] max-w-none"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 z-10 relative">
            <h2 className="text-3xl font-light text-foreground">
              Apple
              <br />
              AirPods <span className="font-medium">Max</span>
            </h2>
            <p className="text-text-muted text-sm font-medium max-w-[160px]">
              Computational audio. Listen, it&apos;s powerful.
            </p>
          </div>
        </div>

        <div className="col-span-1 bg-banner-darker flex items-center justify-end relative overflow-hidden p-6 md:p-12 xl:border-r border-border min-h-[250px]">
          <Link href="/catalog/accessories" className="absolute inset-0 z-20">
            <span className="sr-only">Apple Vision Pro</span>
          </Link>
          <div className="absolute -left-44 top-0 h-full w-auto flex items-center">
            <Image
              src={visionProImg}
              alt="Apple Vision Pro"
              className="w-[312px] h-[190px] max-w-none"
            />
          </div>
          <div className="w-auto flex flex-col justify-center gap-4 z-10 relative">
            <h2 className="text-3xl font-light text-background">
              Apple
              <br />
              Vision <span className="font-medium">Pro</span>
            </h2>
            <p className="text-text-muted text-sm font-medium max-w-[160px]">
              An immersive way to experience entertainment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
