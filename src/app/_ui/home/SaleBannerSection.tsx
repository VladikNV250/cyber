import { Container } from '@/shared/ui';
import { Button } from '@/shared/ui';

export function SaleBannerSection() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'linear-gradient(to right, #211C24, #211C24)' }}
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550009158-9effb6ba3564?auto=format&fit=crop&q=80')] opacity-20 mix-blend-overlay bg-cover bg-center" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center text-center py-32 md:py-48">
          <h2 className="text-white text-6xl md:text-8xl font-thin tracking-tighter mb-4">
            Big Summer <span className="font-bold">Sale</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-lg">
            Commodo fames vitae vitae leo mauris in. Eu consequat.
          </p>
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-black px-12 py-6 text-lg font-medium"
          >
            Shop Now
          </Button>
        </div>
      </Container>
    </section>
  );
}
