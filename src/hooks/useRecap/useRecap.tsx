import { useMemo } from 'react'

interface RecapProps {
  dataLength: number
  filteredDataLength: undefined | number
  currentPage: number
  pageSize: number
}

const getIndices = (total: number, pageSize: number, currentPage: number) => {
  const pageOffset = pageSize * currentPage
  const first = 1 + pageOffset - pageSize
  const last = total >= pageOffset ? pageOffset : total
  return { first, last }
}

export const useRecap = ({
  dataLength,
  filteredDataLength,
  currentPage,
  pageSize,
}: RecapProps) => {
  const isFiltered = filteredDataLength !== undefined && filteredDataLength !== dataLength

  const indices = useMemo(() => {
    if (dataLength && !isFiltered) {
      return getIndices(dataLength, pageSize, currentPage)
    }

    if (dataLength && isFiltered && filteredDataLength > 0) {
      return getIndices(filteredDataLength, pageSize, currentPage)
    }

    return { first: 0, last: 0 }
  }, [dataLength, filteredDataLength, isFiltered, currentPage, pageSize])

  return {
    originalLength: dataLength,
    currentLength: isFiltered ? filteredDataLength : dataLength,
    indices,
  }
}
