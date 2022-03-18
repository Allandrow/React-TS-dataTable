import { sortFunctions } from '../../utils'
import { Data, DefaultColumn, SortBy } from '../../types'

interface SortingProps {
  data: Data[]
  sorting: SortBy
  columns: DefaultColumn[]
}

export const useSorting = ({ data, sorting, columns }: SortingProps) => {
  const { sortMethod } = columns.find((column) => column.id === sorting.id)!

  if (sortMethod) {
    return [...data].sort((a, b) => sortFunctions.get(sortMethod)(a, b, sorting))
  }

  return [...data].sort((a, b) => sortFunctions.get('sortString')(a, b, sorting))
}
