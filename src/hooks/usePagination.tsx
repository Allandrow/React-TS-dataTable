import { useMemo } from 'react'

interface UsePaginationProps {
  currentPage: number
  pageSize: number
  dataLength: number
  siblingCount?: number
}

const getRange = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => i + start)
}

export const usePagination = ({
  currentPage,
  pageSize,
  dataLength,
  siblingCount = 1,
}: UsePaginationProps) => {
  const pagination = useMemo(() => {
    const totalPageCount = Math.ceil(dataLength / pageSize)
    const firstPage = 1
    const displayedPagesCount = 7
    const suspendCountThreshold = 4

    if (dataLength === 0) return [firstPage]

    // display all pages
    if (totalPageCount <= displayedPagesCount) return getRange(1, totalPageCount)

    // if currentPage is in the first four pages, suspend after 5th page
    if (currentPage <= 4) {
      const pagesBeforeSuspendCount = suspendCountThreshold + siblingCount
      const pages = getRange(1, pagesBeforeSuspendCount)

      return [...pages, '...', totalPageCount]
    }

    // if currentPage is in the last four pages, suspend before last 5 pages
    if (currentPage >= totalPageCount - suspendCountThreshold) {
      const pagesAfterSuspendCount =
        totalPageCount - suspendCountThreshold + siblingCount - 1
      const pages = getRange(pagesAfterSuspendCount, totalPageCount)

      return [firstPage, '...', ...pages]
    }

    // suspend before and after siblingCount from currentPage
    const pages = getRange(currentPage - siblingCount, currentPage + siblingCount)

    return [firstPage, '...', ...pages, '...', totalPageCount]
  }, [currentPage, pageSize, dataLength, siblingCount])

  return pagination
}
