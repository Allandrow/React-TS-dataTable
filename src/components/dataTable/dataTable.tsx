import { useMemo, useState, FormEvent } from 'react'
import { Employees } from '../../fixtures/employees'
import { Headings } from '../../fixtures/headings'
import { useSorting } from '../../hooks/useSorting'
import { Ordering } from '../../types'
import { PageSizeSelect } from '../pageSizeSelect/PageSizeSelect'
import { Pagination } from '../pagination/Pagination'
import { Recap } from '../recap/Recap'
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
  const [currentPage, setCurrentPage] = useState(1)
  const [ordering, setOrdering] = useState({
    key: headings[0].key,
    order: 'descending',
  } as Ordering)

  const sortedData = useMemo(() => useSorting({ data, ordering }), [data, ordering])
  const filteredData = useMemo(() => {
    if (searchValue.length >= 2) {
      return sortedData.filter((item) =>
        Object.values(item).some((value) => value.toLowerCase().includes(searchValue))
      )
    }

    return undefined
  }, [sortedData, searchValue])

  const displayedData = useMemo(() => {
    const data = filteredData || sortedData
    return data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  }, [sortedData, filteredData, currentPage, pageSize, ordering])

  const handleChangeSize = (value: number) => {
    setPageSize(value)
    setCurrentPage(1)
  }

  const handleFiltering = (e: FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value.toLowerCase())
    setCurrentPage(1)
  }

  return (
    <>
      <div>
        <PageSizeSelect changeSize={handleChangeSize} />
        <SearchInput changeSearch={handleFiltering} />
      </div>
      <Table
        displayedData={displayedData}
        headings={headings}
        ordering={ordering}
        changeOrdering={setOrdering}
      />
      <div>
        <Recap
          currentPage={currentPage}
          dataLength={data.length}
          filteredDataLength={filteredData?.length}
          pageSize={pageSize}
        />
        <Pagination
          dataLength={filteredData ? filteredData.length : data.length}
          pageSize={pageSize}
          currentPage={currentPage}
          changePage={setCurrentPage}
        />
      </div>
    </>
  )
}
