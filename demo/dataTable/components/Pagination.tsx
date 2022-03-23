import { paginationWithSuspend } from '../../../src'
import { PageList } from './PageList'
import { PaginationParams } from '../../../src/types'

interface PaginationProps {
  pagination: PaginationParams | null
  handlePageChange: (value: number) => void
}

export const Pagination = ({ pagination, handlePageChange }: PaginationProps) => {
  const paginationRenderValues = pagination
    ? paginationWithSuspend(pagination, {
        suspendCountThreshold: 4,
        displayedPagesUntilSuspend: 7,
        siblingCount: 1,
      })
    : null

  const goToPreviousPage = () => handlePageChange(pagination.page - 1)
  const goToNextPage = () => handlePageChange(pagination.page + 1)
  const isPreviousButtonDisabled = !pagination || pagination.page === pagination.firstPage
  const isNextButtonDisabled = !pagination || pagination.page === pagination.lastPage

  return (
    <ul className="pagination">
      <li>
        <button
          onClick={goToPreviousPage}
          disabled={isPreviousButtonDisabled}
          className="pagination-nav"
        >
          previous
        </button>
      </li>
      {paginationRenderValues && (
        <PageList {...paginationRenderValues} handlePageChange={handlePageChange} />
      )}
      <li>
        <button
          onClick={goToNextPage}
          disabled={isNextButtonDisabled}
          className="pagination-nav"
        >
          next
        </button>
      </li>
    </ul>
  )
}
