import { useMemo } from 'react'

interface RecapProps {
  dataLength: number
  filteredDataLength: undefined | number
  currentPage: number
  pageSize: number
}

const getIndices = (total: number, pageSize: number, currentPage: number) => {
  const pageOffset = pageSize * currentPage
  const firstIndex = 1 + pageOffset - pageSize
  const lastIndex = total >= pageOffset ? pageOffset : total
  return { firstIndex, lastIndex }
}

export const useSummary = ({
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

    return { firstIndex: 0, lastIndex: 0 }
  }, [dataLength, filteredDataLength, isFiltered, currentPage, pageSize])

  return {
    originalLength: dataLength,
    filteredLength: filteredDataLength,
    isFiltered,
    ...indices,
  }
}
