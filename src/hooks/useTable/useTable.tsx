import { useMemo, useState } from 'react'
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

export interface Header {
  id: string
  text: string
  isSorted: boolean
  sortingDirection: 'ascending' | 'descending'
}

interface Row {
  key: string
  cellValue: unknown
  isSorted: boolean
}

export interface Rows {
  key: string
  data: Row[]
}

export interface StateChangeOptions {
  resetPage: boolean
}

export type HandleSorting = (sorting: SortBy, options?: StateChangeOptions) => void
export type HandleFiltering = (value: string, options?: StateChangeOptions) => void
export type HandlePageSizing = (value: number, options?: StateChangeOptions) => void

export const useTable = ({
  columns,
  data,
  pageSizeOptions = [10, 20, 50, 100],
}: TableProps) => {
  const [sorting, setSorting] = useState<SortBy>({
    id: columns[0].id,
    direction: 'descending',
  })
  const [filter, setFilter] = useState('')
  const [pageSize, setPageSize] = useState(pageSizeOptions[0])
  const [page, setPage] = useState(1)

  const handlePageReset = (reset: boolean) => {
    if (reset) setPage(1)
  }

  const handleSorting: HandleSorting = (sorting, options = { resetPage: true }) => {
    setSorting(sorting)
    handlePageReset(options.resetPage)
  }

  const handleFiltering: HandleFiltering = (value, options = { resetPage: true }) => {
    setFilter(value)
    handlePageReset(options.resetPage)
  }

  const handlePageSizing: HandlePageSizing = (value, options = { resetPage: true }) => {
    setPageSize(value)
    handlePageReset(options.resetPage)
  }

  const headers = useMemo(() => useHeader({ columns, sorting }), [columns, sorting])

  const sortedData = useMemo(
    () => useSorting({ data, sorting, columns }),
    [data, sorting, headers]
  )

  const filteredData = useMemo(
    () => useFiltering({ data: sortedData, filter }),
    [sortedData, filter, sorting]
  )

  const rows = useMemo(
    () => useRows({ data: filteredData, headers, sorting }),
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
    summary,
    handleSorting,
    handleFiltering,
    handlePageSizing,
  }
}
