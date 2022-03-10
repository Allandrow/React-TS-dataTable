import { FormEvent, useMemo, useState } from 'react'
import { useFiltering } from '../useFiltering/useFiltering'
import { useHeader } from '../useHeader/useHeader'
import { usePagination } from '../usePagination/usePagination'
import { useSummary } from '../useSummary/useSummary'
import { useRows } from '../useRows/useRows'
import { useSorting } from '../useSorting/useSorting'

type DataProps = Record<string, unknown>

export interface Data extends DataProps {
  key: string
}

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
  handleSorting: (sorting: SortBy) => void
}

interface Row {
  key: string
  cellValue: unknown
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
  const [page, setPage] = useState(1)

  const handleSorting = (sorting: SortBy) => {
    setSorting(sorting)
    setPage(1)
  }

  const handleFiltering = (e: FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value.toLowerCase())
    setPage(1)
  }

  const handlePageSizing = (e: FormEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.currentTarget.value, 10))
    setPage(1)
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
    () => useRows({ data: filteredData, headers }),
    [sortedData, filteredData, headers, sorting]
  )

  const slicedRows = useMemo(
    () => rows.slice((page - 1) * pageSize, page * pageSize),
    [rows, page, pageSize, sorting]
  )

  const pagination = usePagination({
    page,
    pageSize,
    rowsLength: rows.length,
    setPage,
  })

  const summary = useSummary({
    dataLength: data.length,
    filteredDataLength: filteredData.length,
    page,
    pageSize,
  })

  return {
    headers,
    rows: slicedRows,
    pagination,
    sorting,
    summary,
    handleFiltering,
    handlePageSizing,
  }
}
