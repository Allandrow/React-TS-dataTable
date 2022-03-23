import { HandlePageChange } from '../../../src/types'

interface PageButtonProps {
  page: number
  handlePageChange: HandlePageChange
}

export const PageButton = ({ page, handlePageChange }: PageButtonProps) => {
  return <button onClick={() => handlePageChange(page)}>{page}</button>
}
