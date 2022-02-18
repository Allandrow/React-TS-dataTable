import { usePagination } from '../../hooks/usePagination'
import { PageDependant } from '../../types'
import { PageButton } from '../pageButton/PageButton'

interface PaginationProps extends PageDependant {
  dataLength: number
  changePage: (value: number) => void
}

interface PaginationListParams {
  pageList: { page: number; current?: boolean }[]
  suspendAfterList: boolean
  suspendBeforeList: boolean
  lastPage?: number
  firstPage?: number
}

export const Pagination = ({
  dataLength,
  pageSize,
  currentPage,
  changePage,
}: PaginationProps) => {
  const getPreviousPage = () => changePage(currentPage - 1)
  const getNextPage = () => changePage(currentPage + 1)

  const { pageList, suspendAfterList, suspendBeforeList, lastPage, firstPage } =
    usePagination({
      currentPage,
      pageSize,
      dataLength,
    }) as PaginationListParams

  const isPreviousButtonDisabled = dataLength === 0 || currentPage === 1
  const isNextButtonDisabled =
    dataLength === 0 || currentPage === pageList[pageList.length - 1].page

  return (
    <ul>
      <li>
        <button onClick={getPreviousPage} disabled={isPreviousButtonDisabled}>
          previous
        </button>
      </li>

      {suspendBeforeList && (
        <>
          <li key={firstPage}>
            <PageButton value={firstPage as number} changePage={changePage} />
          </li>
          <li key={'suspendedBeforeList'}>
            <span>...</span>
          </li>
        </>
      )}

      {pageList.length > 0 &&
        pageList.map(({ page, current }) => (
          <li key={page} className={current ? 'current' : undefined}>
            {current && <span>{page}</span>}
            {!current && <PageButton value={page} changePage={changePage} />}
          </li>
        ))}

      {suspendAfterList && (
        <>
          <li key={'suspendedAfterList'}>
            <span>...</span>
          </li>
          <li key={lastPage}>
            <PageButton value={lastPage as number} changePage={changePage} />
          </li>
        </>
      )}

      <li>
        <button onClick={getNextPage} disabled={isNextButtonDisabled}>
          next
        </button>
      </li>
    </ul>
  )
}
