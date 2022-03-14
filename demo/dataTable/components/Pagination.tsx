import { paginationRenderHelper } from '../../../src/helpers/paginationRenderHelper'
import { PaginationValues } from '../../../src/hooks/usePagination/usePagination'
import { PageList } from './PageList'

interface PaginationProps {
  pagination: PaginationValues
}

export const Pagination = ({ pagination }: PaginationProps) => {
  const paginationRenderValues = pagination
    ? paginationRenderHelper(pagination, {
        threshold: 4,
        displayedPagesUntilSuspend: 7,
        siblingCount: 1,
      })
    : null

  const { firstPage, lastPage, page, setPage } = pagination

  const goToPreviousPage = () => setPage(page - 1)
  const goToNextPage = () => setPage(page + 1)
  const isPreviousButtonDisabled = !pagination || page === firstPage
  const isNextButtonDisabled = !pagination || page === lastPage

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
