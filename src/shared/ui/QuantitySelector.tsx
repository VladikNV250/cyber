import { Minus, Plus } from 'lucide-react';

export interface QuantitySelectorProps {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  value,
  onDecrease,
  onIncrease,
  min = 1,
  max,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onDecrease}
        disabled={value <= min}
        className="p-1 hover:bg-gray-100 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-black"
        aria-label="Decrease quantity"
      >
        <Minus className="w-5 h-5" />
      </button>
      <div className="w-10 h-10 flex items-center justify-center border border-[#D9D9D9] rounded font-medium text-lg">
        {value}
      </div>
      <button
        onClick={onIncrease}
        disabled={max !== undefined && value >= max}
        className="p-1 hover:bg-gray-100 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-black"
        aria-label="Increase quantity"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}
