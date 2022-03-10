import { Data } from '../useTable/useTable'

interface FilteringProps {
  data: Data[]
  searchValue: string
}

export const useFiltering = ({ data, searchValue }: FilteringProps) => {
  if (searchValue.length > 0) {
    return data.filter((row) =>
      Object.values(row).some((cell) => {
        if (typeof cell === 'string') {
          return cell.toLowerCase().includes(searchValue)
        }

        return String(cell).includes(searchValue)
      })
    )
  }

  return data
}
