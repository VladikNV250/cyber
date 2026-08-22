'use client';

interface ProductOptionsProps {
  availableOptions: Record<string, string[]>;
  selectedOptions: Record<string, string | null>;
  onOptionSelect: (key: string, value: string) => void;
}

export function ProductOptions({
  availableOptions,
  selectedOptions,
  onOptionSelect,
}: ProductOptionsProps) {
  return (
    <div className="flex flex-col gap-6 mb-6">
      {Object.entries(availableOptions).map(([key, values]) => (
        <div key={key} className="flex flex-wrap gap-3">
          {values.map((val) => {
            const isSelected = selectedOptions[key] === val;
            return (
              <button
                key={val}
                onClick={() => onOptionSelect(key, val)}
                className={`cursor-pointer disabled:cursor-default px-6 py-3 border rounded-md text-sm font-medium transition-colors ${
                  isSelected
                    ? 'border-black text-black cursor-default'
                    : 'border-gray-200 text-gray-500 hover:border-gray-400'
                }`}
              >
                {val}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
