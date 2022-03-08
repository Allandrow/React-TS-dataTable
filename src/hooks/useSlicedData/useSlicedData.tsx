import { Rows } from '../useTable/useTable'

interface SlicedDataProps {
  rows: Rows[]
  currentPage: number
  pageSize: number
}

export const useSlicedData = ({ rows, currentPage, pageSize }: SlicedDataProps) => {
  return rows.slice((currentPage - 1) * pageSize, currentPage * pageSize)
}
