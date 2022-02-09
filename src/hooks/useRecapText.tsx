import { useEffect, useState } from 'react'
import { TextRecap } from '../types'

const getIndices = (length: number, pageSize: number, currentPage: number) => {
  const pageOffset = pageSize * currentPage
  const first = 1 + pageOffset - pageSize
  const last = length >= pageOffset ? pageOffset : length

  return { first, last }
}

export const useRecapText = ({
  dataLength,
  filteredDataLength,
  pageSize,
  currentPage,
}: TextRecap) => {
  const [indices, setIndices] = useState({ first: 0, last: 0 })
  const [recap, setRecap] = useState('')
  const isFiltered = filteredDataLength !== undefined && filteredDataLength > 0
  const isNotFiltered =
    filteredDataLength === undefined || (isFiltered && filteredDataLength === dataLength)

  useEffect(() => {
    if (dataLength && isNotFiltered) {
      setIndices(getIndices(dataLength, pageSize, currentPage))
    }
    if (dataLength && isFiltered) {
      setIndices(getIndices(filteredDataLength, pageSize, currentPage))
    }
  }, [])

  useEffect(() => {
    const { first, last } = indices

    if (isNotFiltered) {
      setRecap(`Showing ${first} to ${last} of ${dataLength} entries`)
    } else {
      setRecap(
        `Showing ${first} to ${last} of ${filteredDataLength} entries (filtered from ${dataLength} total entries)`
      )
    }
  }, [indices])

  return recap
}
