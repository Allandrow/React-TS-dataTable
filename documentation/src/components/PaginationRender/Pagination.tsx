import React from 'react'

interface PaginationProps {
  firstPage: number
  lastPage: number
  page: number
  pageList: number[]
  suspendAfterList: boolean
  suspendBeforeList: boolean
}

export const Pagination = ({
  firstPage,
  lastPage,
  page,
  pageList,
  suspendAfterList,
  suspendBeforeList,
}: PaginationProps) => {
  return (
    <ul className="pagination">
      {suspendBeforeList && (
        <>
          <li key={firstPage} className="pagination__item">
            <button className="pagination__link">{firstPage}</button>
          </li>
          <li key={'suspendedBeforeList'} className="pagination__item">
            <span>…</span>
          </li>
        </>
      )}
      {pageList.length > 0 &&
        pageList.map((pageNumber) => (
          <li
            key={pageNumber}
            className={
              pageNumber === page
                ? 'pagination__item--active pagination__item'
                : 'pagination__item'
            }
          >
            <button className="pagination__link">{pageNumber}</button>
          </li>
        ))}
      {suspendAfterList && (
        <>
          <li key={'suspendedAfterList'} className="pagination__item">
            <span>…</span>
          </li>
          <li key={lastPage} className="pagination__item">
            <button className="pagination__link">{lastPage}</button>
          </li>
        </>
      )}
    </ul>
  )
}
