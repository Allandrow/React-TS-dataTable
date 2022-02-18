import { Employees } from '../fixtures/employees'

interface FilteringProps {
  sortedData: Employees
  searchValue: string
}

export const useFiltering = ({ sortedData, searchValue }: FilteringProps) => {
  if (searchValue.length > 0) {
    return sortedData.filter((item) =>
      Object.values(item).some((value) => value.toLowerCase().includes(searchValue))
    )
  }

  return undefined
}
