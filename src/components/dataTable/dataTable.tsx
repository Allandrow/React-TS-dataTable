import { useEffect, useMemo, useState } from 'react'
import { Employees } from '../../fixtures/employees'
import { Headings } from '../../fixtures/headings'
import { useSorting } from '../../hooks/useSorting'
import { Ordering } from '../../types'
import { PageSizeSelect } from '../pageSizeSelect/PageSizeSelect'
import { SearchInput } from '../searchInput/SearchInput'
import { Table } from '../table/Table'

// <T extends Record<string, number | string>>
type DataTableProps = {
  data: Employees
  headings: Headings
}

export const DataTable = ({ data, headings }: DataTableProps) => {
  const [pageSize, setPageSize] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  const [ordering, setOrdering] = useState({
    key: headings[0].key,
    order: 'descending',
  } as Ordering)

  useEffect(() => {}, [pageSize, searchValue])

  const sortedData = useMemo(() => useSorting({ data, ordering }), [data, ordering])
  const filteredData = useMemo(() => {
    if (searchValue.length >= 2) {
      return sortedData.filter((item) => {
        return Object.values(item).some((value) => {
          return value.toLowerCase().includes(searchValue)
        })
      })
    }

    return undefined
  }, [sortedData, searchValue])

  const displayedData = filteredData || sortedData

  return (
    <>
      <PageSizeSelect changeSize={setPageSize} />
      <SearchInput changeSearch={setSearchValue} />
      <Table
        displayedData={displayedData}
        headings={headings}
        ordering={ordering}
        changeOrdering={setOrdering}
      />
    </>
  )
}
/*
  state :
    - searchValue
    - pageSize
    - currentPage
    - ordering
    - displayedData
*/

// select
// search
/*
  Table :
    - headings with ordering
    - displayedData
*/
// recap
// pagination

/*
  rerenders :
    - displayedData when pageSize / searchValue / ordering / currentPage changes
    - pagination when pageSize / displayedData / currentPage changes
    - recap when currentPage / pageSize / searchValue changes
*/
