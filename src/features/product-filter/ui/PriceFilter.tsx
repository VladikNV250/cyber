'use client';
import { Input, Slider } from '@/shared/ui';
import { usePriceFilter } from '../lib/usePriceFilter';
import { CatalogFilters } from '@/entities/product';

interface Props {
  bounds: CatalogFilters['priceRange'];
}

export function PriceFilter({ bounds }: Props) {
  const {
    localRange,
    handleSliderChange,
    handleMinInputChange,
    handleMaxInputChange,
  } = usePriceFilter(bounds);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="price-from"
            className="text-sm text-[#A7A7A7] font-normal text-left tracking-[-0.5%] cursor-pointer"
          >
            From
          </label>
          <label
            htmlFor="price-to"
            className="text-sm text-[#A7A7A7] font-normal text-right tracking-[-0.5%] cursor-pointer"
          >
            To
          </label>
        </div>

        <div className="flex items-center justify-between gap-3">
          <Input
            id="price-from"
            type="number"
            value={localRange.min}
            min={bounds.min}
            max={bounds.max}
            className="w-full bg-background border-border text-foreground font-medium text-sm text-left p-2 rounded-[3px]"
            aria-label="Minimum price"
            onChange={handleMinInputChange}
          />
          <div className="w-5 h-px shrink-0 bg-[#E7E7E7]" />
          <Input
            id="price-to"
            type="number"
            value={localRange.max}
            min={bounds.min}
            max={bounds.max}
            className="w-full bg-background border-border text-foreground font-medium text-sm text-right p-2 rounded-[3px]"
            aria-label="Maximum price"
            onChange={handleMaxInputChange}
          />
        </div>
      </div>

      <Slider
        value={[localRange.min, localRange.max]}
        onValueChange={handleSliderChange}
        max={bounds.max}
        min={bounds.min}
        step={1}
        minStepsBetweenThumbs={1}
        className="mt-4 mb-2"
        aria-label="Price range"
      />
    </>
  );
}
