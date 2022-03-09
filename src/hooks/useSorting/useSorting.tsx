import { sortFunctions } from '../../utils/sortFunctions'
import { Data, DefaultColumn, SortBy } from '../useTable/useTable'

interface SortingProps {
  data: Data[]
  sorting: SortBy
  columns: DefaultColumn[]
}

export const useSorting = ({ data, sorting, columns }: SortingProps) => {
  const { sortMethod } = columns.find((column) => column.id === sorting.id)!

  if (sortMethod === undefined) {
    return data.sort((a, b) => sortFunctions.get('sortString')(a, b, sorting))
  }

  return data.sort((a, b) => sortFunctions.get(sortMethod)(a, b, sorting))
}