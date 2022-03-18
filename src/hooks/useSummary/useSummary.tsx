interface SummaryProps {
  dataLength: number
  filteredDataLength: number
  page: number
  pageSize: number
}

export interface SummaryValues {
  originalLength: number
  filteredLength: number
  isFiltered: boolean
  firstIndex: number
  lastIndex: number
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
  page,
  pageSize,
}: SummaryProps): SummaryValues => {
  const isFiltered = filteredDataLength !== undefined && filteredDataLength !== dataLength

  let indices = { firstIndex: 0, lastIndex: 0 }

  if (dataLength && !isFiltered) {
    indices = getIndices(dataLength, pageSize, page)
  }
  if (dataLength && isFiltered && filteredDataLength > 0) {
    indices = getIndices(filteredDataLength, pageSize, page)
  }

  return {
    originalLength: dataLength,
    filteredLength: filteredDataLength,
    isFiltered,
    ...indices,
  }
}
