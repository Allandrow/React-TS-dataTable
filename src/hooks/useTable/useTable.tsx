import { FormEvent, SyntheticEvent, useMemo, useState } from 'react'
import { useFiltering } from '../useFiltering/useFiltering'
import { useHeader } from '../useHeader/useHeader'
import { usePagination } from '../usePagination/usePagination'
import { useRecap } from '../useRecap/useRecap'
import { useRows } from '../useRows/useRows'
import { useSorting } from '../useSorting/useSorting'

export type Data = Record<string, unknown>

export interface DefaultColumn {
  id: string
  header: string
  sortMethod?: string
}

interface TableProps {
  columns: DefaultColumn[]
  data: Data[]
  pageSizeOptions?: number[]
}

export interface SortBy {
  id: string
  direction: 'ascending' | 'descending'
}

export interface OptionsList {
  sortBy: SortBy
  disabled: string[]
}

export interface Header {
  id: string
  text: string
  classNames: string[]
  handleSortEvent: (e: SyntheticEvent) => void
}

interface Row {
  key: string
  cell: unknown
  classNames: string[]
}

export interface Rows {
  key: string
  data: Row[]
}

export const useTable = ({
  columns,
  data,
  pageSizeOptions = [10, 20, 50, 100],
}: TableProps) => {
  const [sorting, setSorting] = useState<SortBy>({
    id: columns[0].id,
    direction: 'descending',
  })
  const [searchValue, setSearchValue] = useState('')
  const [pageSize, setPageSize] = useState(pageSizeOptions[0])
  const [currentPage, setCurrentPage] = useState(1)

  const handleSorting = (sorting: SortBy) => {
    setSorting(sorting)
    setCurrentPage(1)
  }

  const handleFiltering = (e: FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value.toLowerCase())
    setCurrentPage(1)
  }

  const handlePageSizing = (e: FormEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.currentTarget.value, 10))
    setCurrentPage(1)
  }

  const headers = useMemo(
    () => useHeader({ columns, sorting, handleSorting }),
    [columns, sorting]
  )

  const sortedData = useMemo(
    () => useSorting({ data, sorting, columns }),
    [data, sorting, headers]
  )

  const filteredData = useMemo(
    () => useFiltering({ data: sortedData, searchValue }),
    [sortedData, searchValue, sorting]
  )

  const rows = useMemo(
    () => useRows({ data: filteredData ?? sortedData, headers, sorting }),
    [sortedData, filteredData, headers, sorting]
  )

  const slicedRows = useMemo(
    () => rows.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [rows, currentPage, pageSize, sorting]
  )

  const pagination = usePagination({
    currentPage,
    pageSize,
    rowsLength: rows.length,
    setCurrentPage,
  })

  const recap = useRecap({
    dataLength: data.length,
    filteredDataLength: filteredData?.length,
    currentPage,
    pageSize,
  })

  return {
    headers,
    rows: slicedRows,
    pagination,
    recap,
    handleFiltering,
    handlePageSizing,
  }
}
