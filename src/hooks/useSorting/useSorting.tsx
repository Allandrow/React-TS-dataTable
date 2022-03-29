import { sortFunctions } from '../../utils'
import { Data, Column, SortBy } from '../../types'

interface SortingProps {
  data: Data[]
  sorting: SortBy
  columns: Column[]
}

export const useSorting = ({ data, sorting, columns }: SortingProps) => {
  const { sortMethod } = columns.find((column) => column.id === sorting.id)!

  if (sortMethod) {
    if (typeof sortMethod === 'string') {
      if (sortFunctions.has(sortMethod)) {
        return [...data].sort((a, b) => sortFunctions.get(sortMethod)(a, b, sorting))
      } else {
        console.error(
          `${sortMethod} is not a known helper sorting method included in this library. \n
          Known methods are : \n
          - sortString
          - sortNumber
          - sortDateISO`
        )
        throw new Error('Invalid sortMethod name')
      }
    }

    if (sortMethod instanceof Function) {
      try {
        return [...data].sort((a, b) => sortMethod(a, b, sorting))
      } catch (err) {
        console.error(err)
        throw new Error('Something went wrong with the function used to sort data')
      }
    }
  }

  return [...data].sort((a, b) => sortFunctions.get('sortString')(a, b, sorting))
}
