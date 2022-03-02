import { Column, Data, Sorting } from '../types'
import { sortingFunctions } from '../utils/sortFunctions'

interface SortingProps {
  data: Data[]
  sorting: Sorting
  columns: Column[]
}

export const useSorting = ({ data, sorting, columns }: SortingProps) => {
  const { sortMethod } = columns.find((column) => column.key === sorting.key)!

  if (sortMethod === undefined) {
    return data.sort((a, b) => sortingFunctions.get('sortString')(a, b, sorting))
  }

  return data.sort((a, b) => sortingFunctions.get(sortMethod)(a, b, sorting))
}
