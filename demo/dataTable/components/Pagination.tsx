import { paginationWithSuspend } from '../../../src/helpers/paginationWithSuspend'
import { PageList } from './PageList'
import { PaginationParams } from '../../../src/types'

interface PaginationProps {
  pagination: PaginationParams | null
}

export const Pagination = ({ pagination }: PaginationProps) => {
  const paginationRenderValues = pagination
    ? paginationWithSuspend(pagination, {
        suspendCountThreshold: 4,
        displayedPagesUntilSuspend: 7,
        siblingCount: 1,
      })
    : null

  const goToPreviousPage = () => pagination?.setPage(pagination.page - 1)
  const goToNextPage = () => pagination?.setPage(pagination.page + 1)
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
      {paginationRenderValues && <PageList {...paginationRenderValues} />}
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
