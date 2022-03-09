import { PageButton } from './PageButton'

interface PaginationProps {
  pageList: { page: number; current?: boolean }[]
  suspendBeforeList: boolean
  suspendAfterList: boolean
  firstPage: number
  lastPage: number
  currentPage: number
  setCurrentPage: (value: number) => void
}

export const Pagination = ({
  pageList,
  suspendBeforeList,
  suspendAfterList,
  firstPage,
  lastPage,
  currentPage,
  setCurrentPage,
}: Partial<PaginationProps>) => {
  const getPreviousPage = () => setCurrentPage(currentPage - 1)
  const getNextPage = () => setCurrentPage(currentPage + 1)

  const isPreviousButtonDisabled = pageList.length === 0 || currentPage === 1
  const isNextButtonDisabled =
    pageList.length === 0 || currentPage === pageList[pageList.length - 1].page

  return (
    <ul className="pagination">
      <li>
        <button
          onClick={getPreviousPage}
          disabled={isPreviousButtonDisabled}
          className="pagination-nav"
        >
          previous
        </button>
      </li>

      {suspendBeforeList && (
        <>
          <li key={firstPage}>
            <PageButton page={firstPage} setCurrentPage={setCurrentPage} />
          </li>
          <li key={'suspendedBeforeList'}>
            <span>…</span>
          </li>
        </>
      )}

      {pageList.length > 0 &&
        pageList.map(({ page, current }) => (
          <li key={page} className={current ? 'current' : ''}>
            {current && <span>{page}</span>}
            {!current && <PageButton page={page} setCurrentPage={setCurrentPage} />}
          </li>
        ))}

      {suspendAfterList && (
        <>
          <li key={'suspendedAfterList'}>
            <span>…</span>
          </li>
          <li key={lastPage}>
            <PageButton page={lastPage} setCurrentPage={setCurrentPage} />
          </li>
        </>
      )}

      <li>
        <button
          onClick={getNextPage}
          disabled={isNextButtonDisabled}
          className="pagination-nav"
        >
          next
        </button>
      </li>
    </ul>
  )
}
