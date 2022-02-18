import { useState, useEffect } from 'react'
import { PageDependant } from '../../types'

interface RecapProps extends PageDependant {
  dataLength: number
  filteredDataLength?: number
}

const getIndices = (total: number, pageSize: number, currentPage: number) => {
  const pageOffset = pageSize * currentPage
  const first = 1 + pageOffset - pageSize
  const last = total >= pageOffset ? pageOffset : total

  return { first, last }
}

export const Recap = ({
  dataLength,
  filteredDataLength,
  pageSize,
  currentPage,
}: RecapProps) => {
  const [indices, setIndices] = useState({ first: 0, last: 0 })
  const [recapText, setRecapText] = useState('')

  const isFiltered = filteredDataLength !== undefined

  useEffect(() => {
    if (dataLength && !isFiltered) {
      setIndices(getIndices(dataLength, pageSize, currentPage))
    }
    if (dataLength && isFiltered) {
      if (filteredDataLength > 0) {
        setIndices(getIndices(filteredDataLength, pageSize, currentPage))
      } else {
        setIndices({ first: 0, last: 0 })
      }
    }
  }, [pageSize, currentPage, isFiltered, filteredDataLength])

  useEffect(() => {
    const { first, last } = indices

    if (isFiltered) {
      setRecapText(
        `Showing ${first} to ${last} of ${filteredDataLength} entries (filtered from ${dataLength} total entries)`
      )
    } else {
      setRecapText(`Showing ${first} to ${last} of ${dataLength} entries`)
    }
  }, [indices, isFiltered])

  return <p>{recapText}</p>
}
