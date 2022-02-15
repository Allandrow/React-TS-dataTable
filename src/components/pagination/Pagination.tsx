import { MouseEvent } from 'react'
import { usePagination } from '../../hooks/usePagination'

type PaginationProps = {
  dataLength: number
  pageSize: number
  currentPage?: number
  callback: (value: number) => void
}

type PaginationListParams = {
  pageList: { page: number; current?: boolean }[]
  suspendAfterList: boolean
  suspendBeforeList: boolean
  lastPage?: number
  firstPage?: number
}

export const Pagination = ({
  dataLength,
  pageSize,
  currentPage = 1,
  callback,
}: PaginationProps) => {
  const getPreviousPage = () => {
    const previousPage = currentPage - 1
    callback(previousPage)
  }

  const getNextPage = () => {
    const nextPage = currentPage + 1
    callback(nextPage)
  }

  const handlePageChange = (e: MouseEvent<HTMLButtonElement>) => {
    const newPage = parseInt(e.currentTarget.textContent as string)
    callback(newPage)
  }

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
            <button onClick={handlePageChange}>{firstPage}</button>
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
            {!current && <button onClick={handlePageChange}>{page}</button>}
          </li>
        ))}

      {suspendAfterList && (
        <>
          <li key={'suspendedAfterList'}>
            <span>...</span>
          </li>
          <li key={lastPage}>
            <button onClick={handlePageChange}>{lastPage}</button>
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
