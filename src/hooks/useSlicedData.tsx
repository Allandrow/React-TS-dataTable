import { Employees } from '../fixtures/employees'
import { PageDependant } from '../types'

interface SlicedDataProps extends PageDependant {
  sortedData: Employees
  filteredData: Employees | undefined
}

export const useSlicedData = ({
  sortedData,
  filteredData,
  currentPage,
  pageSize,
}: SlicedDataProps) => {
  const data = filteredData || sortedData
  return {
    filtered: filteredData !== undefined,
    data: data.slice((currentPage - 1) * pageSize, currentPage * pageSize),
  }
}
