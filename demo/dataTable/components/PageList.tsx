import { PaginationRenderValues } from '../../../src/helpers/paginationWithSuspend'
import { PageButton } from './PageButton'

export const PageList = ({
  firstPage,
  lastPage,
  page,
  pageList,
  setPage,
  suspendAfterList,
  suspendBeforeList,
}: PaginationRenderValues) => {
  return (
    <>
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
            {pageNumber === page ? (
              <span>{pageNumber}</span>
            ) : (
              <PageButton page={pageNumber} setPage={setPage} />
            )}
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
    </>
  )
}
