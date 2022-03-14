import { paginationRenderHelper } from '../../../src/helpers/paginationRenderHelper'
import { PaginationValues } from '../../../src/hooks/usePagination/usePagination'
import { PageButton } from './PageButton'

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

  if (!paginationRenderValues) return null

  const {
    firstPage,
    lastPage,
    page,
    pageList,
    setPage,
    suspendAfterList,
    suspendBeforeList,
  } = paginationRenderValues

  const goToPreviousPage = () => setPage(page - 1)
  const goToNextPage = () => setPage(page + 1)
  const isPreviousButtonDisabled = pageList.length === 0 || page === 1
  const isNextButtonDisabled =
    pageList.length === 0 || page === pageList[pageList.length - 1]

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
      {suspendBeforeList && (
        <>
          <li key={firstPage}>
            <PageButton page={firstPage} setPage={setPage} />
          </li>
          <li key={'suspendedBeforeList'}>
            <span>…</span>
          </li>
        </>
      )}
      {pageList.length > 0 &&
        pageList.map((pageNumber) => (
          <li key={pageNumber} className={pageNumber === page ? 'current' : ''}>
            {pageNumber === page && <span>{pageNumber}</span>}
            {!(pageNumber === page) && <PageButton page={pageNumber} setPage={setPage} />}
          </li>
        ))}
      {suspendAfterList && (
        <>
          <li key={'suspendedAfterList'}>
            <span>…</span>
          </li>
          <li key={lastPage}>
            <PageButton page={lastPage} setPage={setPage} />
          </li>
        </>
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
