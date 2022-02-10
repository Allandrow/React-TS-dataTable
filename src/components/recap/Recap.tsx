import { useState, useEffect } from 'react'

type RecapProps = {
  dataLength: number
  filteredDataLength?: number
  pageSize?: number
  currentPage?: number
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
  pageSize = 10,
  currentPage = 1,
}: RecapProps) => {
  const [indices, setIndices] = useState({ first: 0, last: 0 })
  const [recapText, setRecapText] = useState('')

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
      setRecapText(`Showing ${first} to ${last} of ${dataLength} entries`)
    } else {
      setRecapText(
        `Showing ${first} to ${last} of ${filteredDataLength} entries (filtered from ${dataLength} total entries)`
      )
    }
  }, [indices])

  return <p>{recapText}</p>
}
