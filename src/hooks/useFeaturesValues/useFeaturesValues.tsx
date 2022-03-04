import { DefaultColumn, OptionsList, SortBy } from '../useTable/useTable'

interface FeaturesProps {
  columns: DefaultColumn[]
  options?: Partial<OptionsList>
}

interface FeaturesValues {
  sortBy: SortBy
}

export const useFeaturesValues = ({ columns, options = {} }: FeaturesProps) => {
  const initialValues: Partial<FeaturesValues> = {}

  // sort initial value if enabled
  if (!options?.disabled?.includes('sortBy')) {
    initialValues.sortBy = options.sortBy ?? {
      id: columns[0].id,
      direction: 'descending',
    }
  }

  return initialValues
}
