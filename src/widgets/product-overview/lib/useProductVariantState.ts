import { parseAsStringEnum, useQueryStates } from 'nuqs';
import { useMemo } from 'react';

export function useProductVariantState(
  availableOptions: Record<string, string[]>,
) {
  const parsers = useMemo(() => {
    const p: Record<string, ReturnType<typeof parseAsStringEnum>> = {};
    for (const [key, values] of Object.entries(availableOptions)) {
      if (values.length > 0) {
        p[key] = parseAsStringEnum([...values]);
      }
    }
    return p;
  }, [availableOptions]);

  const [selectedOptions, setSelectedOptions] = useQueryStates(parsers, {
    history: 'replace',
    shallow: true,
  });

  const handleOptionSelect = (key: string, value: string) => {
    setSelectedOptions({ [key]: value });
  };

  return { selectedOptions, handleOptionSelect };
}
