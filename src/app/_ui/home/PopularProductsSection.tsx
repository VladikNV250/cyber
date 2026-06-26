import { Button } from '@/shared/ui';

export function PopularProductsSection() {
  const banners = [
    {
      title: 'Popular Products',
      subtitle:
        'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.',
      bg: 'bg-white',
      textColor: 'text-black',
      btnVariant: 'outline' as const,
    },
    {
      title: 'Ipad Pro',
      subtitle:
        'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.',
      bg: 'bg-[#F9F9F9]',
      textColor: 'text-black',
      btnVariant: 'outline' as const,
    },
    {
      title: 'Samsung Galaxy',
      subtitle:
        'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.',
      bg: 'bg-[#EAEAEA]',
      textColor: 'text-black',
      btnVariant: 'outline' as const,
    },
    {
      title: 'Macbook Pro',
      subtitle:
        'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.',
      bg: 'bg-[#2C2C2C]',
      textColor: 'text-white',
      btnVariant: 'outline' as const,
    },
  ];

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 w-full">
        {banners.map((b, i) => (
          <div
            key={i}
            className={`${b.bg} ${b.textColor} flex flex-col items-center text-center p-12 h-auto xl:h-[500px]`}
          >
            <div
              className={`w-full h-48 mb-8 rounded-xl flex items-center justify-center shrink-0 ${b.textColor === 'text-white' ? 'bg-white/10' : 'bg-black/5'}`}
            >
              <span className="text-sm opacity-50">Image Mockup</span>
            </div>

            <h3 className="text-4xl font-light mb-4">{b.title}</h3>
            <p className="text-sm opacity-70 mb-8 max-w-sm flex-1">
              {b.subtitle}
            </p>

            <Button
              variant={b.btnVariant}
              className={`${b.textColor === 'text-white' ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'} px-12 py-6 mt-auto`}
            >
              Shop Now
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
