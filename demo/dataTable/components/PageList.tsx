import { PaginationRenderValues } from '../../../src/types'
import { PageButton } from './PageButton'

interface PageListProps extends PaginationRenderValues {
  handlePageChange: (value: number) => void
}

export const PageList = ({
  firstPage,
  lastPage,
  page,
  pageList,
  suspendAfterList,
  suspendBeforeList,
  handlePageChange,
}: PageListProps) => {
  return (
    <>
      {suspendBeforeList && (
        <>
          <li key={firstPage}>
            <PageButton page={firstPage} handlePageChange={handlePageChange} />
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
              <PageButton page={pageNumber} handlePageChange={handlePageChange} />
            )}
          </li>
        ))}
      {suspendAfterList && (
        <>
          <li key={'suspendedAfterList'}>
            <span>…</span>
          </li>
          <li key={lastPage}>
            <PageButton page={lastPage} handlePageChange={handlePageChange} />
          </li>
        </>
      )}
    </>
  )
}
