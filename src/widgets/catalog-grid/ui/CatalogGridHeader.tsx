import { ProductSort } from '@/features/product-sort';
import { PaginationMeta } from '@/shared/model';

type Props = Pick<PaginationMeta, 'total'>;

export function CatalogGridHeader({ total }: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="text-[#6C6C6C] text-base font-medium">
        Selected Products:
        <span className="text-foreground font-medium text-xl ml-1.5">
          {total}
        </span>
      </div>

      <ProductSort />
    </div>
  );
}
