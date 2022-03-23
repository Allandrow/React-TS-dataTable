import { Rows } from '../../types'

interface FilteringProps {
  data: Rows[]
  filter: string
}

export const useFiltering = ({ data, filter }: FilteringProps) => {
  if (!filter) return data

  return data.filter(({ data }) =>
    data.some(({ cellValue }) => {
      if (typeof cellValue === 'string') {
        return cellValue.toLowerCase().includes(filter)
      }

      return String(cellValue).includes(filter)
    })
  )
}
