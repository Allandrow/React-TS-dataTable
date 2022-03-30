import { sortFunctions } from '../../utils'
import { Data, Column, SortBy, UserSortMethod } from '../../types'

interface SortingProps {
  data: Data[]
  sorting: SortBy
  columns: Column[]
}

const isSortingFunction = (fnc: unknown): fnc is UserSortMethod => {
  return fnc instanceof Function
}

export const useSorting = ({ data, sorting, columns }: SortingProps) => {
  const { sortMethod } = columns.find((column) => column.id === sorting.id)!

  if (sortMethod) {
    if (isSortingFunction(sortMethod)) {
      try {
        return [...data].sort((a, b) => sortMethod(a, b, sorting))
      } catch (err) {
        console.error(err)
        throw new Error('Something went wrong with the function used to sort data')
      }
    }

    if (typeof sortMethod === 'string' && sortFunctions.has(sortMethod)) {
      return [...data].sort((a, b) => sortFunctions.get(sortMethod)(a, b, sorting))
    }

    console.error(
      `${sortMethod} is not a known helper sorting method included in this library.
        Known methods are :
        - sortString
        - sortNumber
        - sortDateISO`
    )
    throw new Error('Invalid sortMethod name')
  }

  return [...data].sort((a, b) => sortFunctions.get('sortString')(a, b, sorting))
}
