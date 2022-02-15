import { Employees } from '../fixtures/employees'
import { Ordering } from '../types'

interface SortingProps {
  data: Employees
  ordering: Ordering
}

type DataRow = {
  [key: string]: string
}

export const useSorting = ({ data, ordering }: SortingProps) => {
  const { key, order } = ordering
  const includesDateText = /date/i
  const isKeyDate = includesDateText.test(key)

  const sortedData = data.sort((a: DataRow, b: DataRow) => {
    if (isKeyDate) {
      const aDate = new Date(a[key])
      const bDate = new Date(b[key])

      if (aDate < bDate) return order === 'ascending' ? 1 : -1
      if (aDate > bDate) return order === 'ascending' ? -1 : 1
      return 0
    }

    if (a[key] < b[key]) return order === 'ascending' ? 1 : -1
    if (a[key] > b[key]) return order === 'ascending' ? -1 : 1
    return 0
  })

  return sortedData
}
