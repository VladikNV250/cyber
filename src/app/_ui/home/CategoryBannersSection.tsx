import { Button } from '@/shared/ui';

export function CategoryBannersSection() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2 w-full h-auto xl:h-[600px]">
        <div className="col-span-1 md:col-span-2 xl:col-span-2 bg-white flex items-center p-8 md:p-16 border-b border-border xl:border-r">
          <div className="flex-1 flex flex-col md:flex-row items-center gap-8 h-full">
            <div className="w-[200px] h-[200px] bg-muted rounded-xl flex items-center justify-center text-muted-foreground shrink-0">
              Image
            </div>
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h2 className="text-5xl font-medium tracking-tight">
                Playstation 5
              </h2>
              <p className="text-muted-foreground max-w-md">
                Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
                will redefine your PlayStation experience.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 xl:col-span-2 xl:row-span-2 bg-[#EDEDED] flex items-center p-8 md:p-16">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6 max-w-md mx-auto xl:mx-0">
            <h2 className="text-6xl font-thin tracking-tight">
              Macbook <span className="font-medium">Air</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              The new 15‑inch MacBook Air makes room for more of what you love
              with a spacious Liquid Retina display.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="mt-4 px-12 py-6 border-black text-black hover:bg-black hover:text-white w-fit text-lg"
            >
              Shop Now
            </Button>
          </div>
          <div className="flex-1 hidden md:flex justify-end h-full items-center">
            <div className="w-[300px] h-[300px] bg-muted rounded-xl flex items-center justify-center shrink-0">
              Image
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-[#EDEDED] flex flex-col justify-center p-8 border-b md:border-b-0 border-border md:border-r items-center md:items-start text-center md:text-left gap-4">
          <div className="w-[120px] h-[120px] bg-muted/50 rounded-xl flex items-center justify-center shrink-0 mb-4">
            Image
          </div>
          <h2 className="text-3xl font-light">
            Apple
            <br />
            <span className="font-medium">AirPods Max</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Computational audio. Listen, it&apos;s powerful.
          </p>
        </div>

        <div className="col-span-1 bg-[#353535] text-white flex flex-col justify-center p-8 items-center md:items-start text-center md:text-left gap-4 xl:border-r border-border">
          <div className="w-[120px] h-[120px] bg-white/10 rounded-xl flex items-center justify-center shrink-0 mb-4">
            Image
          </div>
          <h2 className="text-3xl font-light">
            Apple
            <br />
            <span className="font-medium">Vision Pro</span>
          </h2>
          <p className="text-gray-400 text-sm">
            An immersive way to experience entertainment.
          </p>
        </div>
      </div>
    </section>
  );
}
