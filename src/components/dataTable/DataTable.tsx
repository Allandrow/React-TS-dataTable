import { useMemo, useState, FormEvent } from 'react'
import { useFiltering } from '../../hooks/useFiltering'
import { useSlicedData } from '../../hooks/useSlicedData'
import { useSorting } from '../../hooks/useSorting'
import { Data, Column, Sorting } from '../../types'
import { PageSizeSelect } from '../pageSizeSelect/PageSizeSelect'
import { Pagination } from '../pagination/Pagination'
import { Recap } from '../recap/Recap'
import { SearchInput } from '../searchInput/SearchInput'
import { Table } from '../table/Table'

export interface DataTableProps {
  data: Data[]
  columns: Column[]
  pageSizeOptions?: number[]
}

export const DataTable = ({
  data,
  columns,
  pageSizeOptions = [10, 20, 50, 100],
}: DataTableProps) => {
  const [pageSize, setPageSize] = useState(pageSizeOptions[0])
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sorting, setSorting] = useState({
    key: columns[0].key,
    direction: 'descending',
  } as Sorting)

  const sortedData = useMemo(
    () => useSorting({ data, sorting, columns }),
    [data, sorting]
  )
  const filteredData = useMemo(
    () => useFiltering({ sortedData, searchValue }),
    [sortedData, searchValue, sorting]
  )
  const displayedData = useMemo(
    () => useSlicedData({ sortedData, filteredData, currentPage, pageSize }),
    [sortedData, filteredData, currentPage, pageSize, sorting]
  )

  const handleChangeSize = (value: number) => {
    setPageSize(value)
    setCurrentPage(1)
  }

  const handleFiltering = (e: FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value.toLowerCase())
    setCurrentPage(1)
  }

  const handleSorting = (value: Sorting) => {
    setSorting(value)
    setCurrentPage(1)
  }

  return (
    <section className="dataTable">
      <PageSizeSelect changeSize={handleChangeSize} options={pageSizeOptions} />
      <SearchInput changeSearch={handleFiltering} />
      <Table
        displayedData={displayedData}
        columns={columns}
        sorting={sorting}
        changeSorting={handleSorting}
      />
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
    </section>
  )
}
