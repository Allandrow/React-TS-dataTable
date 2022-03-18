import { Data } from '../../types'

interface FilteringProps {
  data: Data[]
  filter: string
}

export const useFiltering = ({ data, filter }: FilteringProps) => {
  if (!filter) return data

  return data.filter((row) =>
    Object.values(row).some((cell) => {
      if (typeof cell === 'string') {
        return cell.toLowerCase().includes(filter)
      }

      return String(cell).includes(filter)
    })
  )
}
