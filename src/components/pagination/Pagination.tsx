import { MouseEvent } from 'react'
import { usePagination } from '../../hooks/usePagination'

type PaginationProps = {
  dataLength: number
  pageSize: number
  currentPage?: number
  callback: (value: number) => void
}

export const Pagination = ({
  dataLength,
  pageSize,
  currentPage = 1,
  callback,
}: PaginationProps) => {
  const handleClick = (operation: string) => {
    const newPage = operation === '+' ? currentPage + 1 : currentPage - 1
    callback(newPage)
  }

  const handlePageChange = (e: MouseEvent<HTMLButtonElement>) => {
    const newPage = parseInt(e.currentTarget.textContent as string)
    callback(newPage)
  }

  const pages = usePagination({ currentPage, pageSize, dataLength })

  return (
    <ul className="pagination">
      <li>
        <button onClick={() => handleClick('-')} disabled={currentPage === pages[0]}>
          Previous
        </button>
      </li>
      {pages.map((page, i) => (
        <li key={`${page}-${i}`} className={currentPage === page ? 'current' : undefined}>
          <button
            disabled={currentPage === page || page === '...'}
            onClick={
              currentPage !== page && page !== '...' ? handlePageChange : undefined
            }
          >
            {page}
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={() => handleClick('+')}
          disabled={currentPage === pages[pages.length - 1]}
        >
          Next
        </button>
      </li>
    </ul>
  )
}
