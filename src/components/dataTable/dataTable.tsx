import { useEffect, useState } from 'react'
import { Employees } from '../../fixtures/employees'
import { Headings } from '../../fixtures/headings'
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

  useEffect(() => {
    console.log('pageSize', pageSize)
    console.log('searchValue', searchValue)
    console.log('ordering', ordering)
  }, [pageSize, searchValue, ordering])

  return (
    <>
      <PageSizeSelect callback={setPageSize} />
      <SearchInput callback={setSearchValue} />
      <Table
        displayedData={data}
        headings={headings}
        ordering={ordering}
        callback={setOrdering}
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
