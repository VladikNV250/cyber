import { parseAsJson, useQueryState } from 'nuqs';
import { specsQuerySchema } from '../model/schema';

export function useSpecFilter(specName: string) {
  const [querySpecs, setQuerySpecs] = useQueryState(
    'specs',
    parseAsJson(specsQuerySchema)
      .withDefault({})
      .withOptions({ shallow: false }),
  );

  const toggleSpecOption = (specOption: string, checked: boolean) => {
    const currentOptions = querySpecs[specName] || [];
    const newOptions = checked
      ? [...currentOptions, specOption]
      : currentOptions.filter((opt) => opt !== specOption);

    if (newOptions.length === 0) {
      const newSpecs = { ...querySpecs };
      delete newSpecs[specName];
      setQuerySpecs(Object.keys(newSpecs).length > 0 ? newSpecs : null);
    } else {
      setQuerySpecs({ ...querySpecs, [specName]: newOptions });
    }
  };

  const selectedIds = querySpecs[specName] || [];

  return {
    selectedIds,
    toggleSpecOption,
  };
}
