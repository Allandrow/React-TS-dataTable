import { Data } from '../types'

interface FilteringProps {
  sortedData: Data[]
  searchValue: string
}

export const useFiltering = ({ sortedData, searchValue }: FilteringProps) => {
  if (searchValue.length > 0) {
    return sortedData.filter((item) =>
      Object.values(item).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchValue)
        }
        return value.toString().includes(searchValue)
      })
    )
  }

  return undefined
}
