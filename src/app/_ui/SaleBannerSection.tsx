import Image from 'next/image';
import Link from 'next/link';

import { banner1, banner2, banner3, banner4, banner5 } from '@/shared/assets';
import { Button, Container } from '@/shared/ui';

export function SaleBannerSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(100.23deg,#2E2E2E_38.73%,#000000_99.84%)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 pointer-events-none hidden w-full h-full md:block overflow-hidden">
        <Image
          src={banner1}
          alt=""
          className="absolute bottom-3.5 -left-18 w-104.5 z-40"
        />
        <Image
          src={banner2}
          alt=""
          className="absolute top-1 left-10 w-59.25 z-50"
        />
        <Image
          src={banner3}
          alt=""
          className="absolute -top-16 left-56 w-84.25 z-30"
        />
        <Image
          src={banner4}
          alt=""
          className="absolute top-1 -right-6 -rotate-31 w-30 z-10"
        />
        <Image
          src={banner5}
          alt=""
          className="absolute -bottom-30 -right-2 w-101 z-20"
        />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center text-center pt-32 pb-10 md:pt-40 md:pb-22">
          <h2 className="text-background text-6xl md:text-7xl font-thin tracking-tight leading-18">
            Big Summer <span className="font-medium">Sale</span>
          </h2>
          <p className="text-text-muted-dark text-sm md:text-base mb-10 max-w-lg">
            Commodo fames vitae vitae leo mauris in. Eu consequat.
          </p>
          <Button variant="outline" color="white" asChild>
            <Link href="/catalog">Shop Now</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
