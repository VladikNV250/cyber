import { Container } from '@/shared/ui';
import { Button } from '@/shared/ui';

export function HeroSection() {
  return (
    <section className="bg-[#211C24] overflow-hidden pt-24 pb-0 md:pt-32">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10 pb-24 md:pb-32">
            <h2 className="text-gray-400 text-2xl font-semibold mb-2">
              Pro.Beyond.
            </h2>
            <h1 className="text-white text-7xl md:text-8xl font-thin tracking-tighter mb-6">
              IPhone 14 <span className="font-bold">Pro</span>
            </h1>
            <p className="text-gray-400 text-lg mb-10 max-w-md">
              Created to change everything for the better. For everyone.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white hover:text-black w-fit px-12 py-6 text-lg"
            >
              Shop Now
            </Button>
          </div>

          <div className="flex-1 w-full flex justify-center md:justify-end relative h-[400px] md:h-[600px]">
            <div className="absolute bottom-0 w-[80%] md:w-[400px] h-full bg-linear-to-t from-black/50 to-transparent rounded-t-3xl border-t-8 border-x-8 border-gray-800 flex items-center justify-center">
              <span className="text-white/30 font-bold text-2xl">
                iPhone Mockup
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
