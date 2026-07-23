import { SearchX } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/ui';

export function CatalogGridEmpty() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-6 text-center">
      <div className="size-20 mb-6 flex items-center justify-center rounded-full bg-[#F5F5F5]">
        <SearchX className="size-10 text-[#989898]" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No products found matching your criteria
      </h3>
      <p className="text-sm text-[#A7A7A7] mb-8 max-w-87.5">
        Try adjusting your search or filters to find what you&apos;re looking
        for.
      </p>
      <Button asChild variant="default" className="px-8">
        <Link href="?">Clear all filters</Link>
      </Button>
    </div>
  );
}
