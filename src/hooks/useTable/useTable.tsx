import { useMemo, useState } from 'react'
import { useFiltering } from '../useFiltering'
import { useHeader } from '../useHeader'
import { usePagination } from '../usePagination'
import { useSummary } from '../useSummary'
import { useRows } from '../useRows'
import { useSorting } from '../useSorting'
import { Header, PaginationParams, SummaryValues, Row } from '../../types'

type DataProps = Record<string, unknown>

export interface SortBy {
  id: string
  direction: 'ascending' | 'descending'
}

export interface Data extends DataProps {
  key: string
}

export type UserSortMethod = (a: Data, b: Data, sorting: SortBy) => number

export interface DefaultColumn {
  id: string
  displayText: string
  sortMethod?: string | UserSortMethod
}

interface TableHookProps {
  columns: DefaultColumn[]
  data: Data[]
  pageSizeOptions?: number[]
}

export interface StateChangeOptions {
  resetPage: boolean
}

export type HandleSorting = (sorting: SortBy, options?: StateChangeOptions) => void
export type HandleFiltering = (value: string, options?: StateChangeOptions) => void
export type HandlePageSizing = (value: number, options?: StateChangeOptions) => void
export type HandlePageChange = (value: number) => void

export interface UseTableValues {
  headers: Header[]
  rows: Row[]
  pagination: PaginationParams | null
  summary: SummaryValues
  isFiltered: boolean
  handleSorting: HandleSorting
  handleFiltering: HandleFiltering
  handlePageSizing: HandlePageSizing
  handlePageChange: HandlePageChange
}

export const useTable = ({
  columns,
  data,
  pageSizeOptions = [10, 20, 50, 100],
}: TableHookProps): UseTableValues => {
  const [sorting, setSorting] = useState<SortBy>({
    id: columns[0].id,
    direction: 'descending',
  })
  const [filter, setFilter] = useState('')
  const [pageSize, setPageSize] = useState(pageSizeOptions[0])
  const [page, setPage] = useState(1)

  const isFiltered = filter.length > 0

  const handlePageReset = (reset: boolean) => {
    if (reset) setPage(1)
  }

  // Exposed state modifiying functions
  const handleSorting: HandleSorting = (sorting, options = { resetPage: true }) => {
    setSorting(sorting)
    handlePageReset(options.resetPage)
  }

  const handleFiltering: HandleFiltering = (value, options = { resetPage: true }) => {
    setFilter(value.toLowerCase())
    handlePageReset(options.resetPage)
  }

  const handlePageSizing: HandlePageSizing = (value, options = { resetPage: true }) => {
    setPageSize(value)
    handlePageReset(options.resetPage)
  }

  // Exposed data values manipulated via custom hooks
  const headers = useMemo(() => useHeader({ columns, sorting }), [columns, sorting])

  const sortedData = useMemo(
    () => useSorting({ data, sorting, columns }),
    [data, sorting, headers]
  )

  const rows = useMemo(
    () => useRows({ data: sortedData, headers, sorting }),
    [sortedData, headers, sorting]
  )

  const filteredRows = useMemo(
    () => useFiltering({ data: rows, filter }),
    [rows, filter, sorting]
  )

  const slicedRows = useMemo(
    () => filteredRows.slice((page - 1) * pageSize, page * pageSize),
    [filteredRows, page, pageSize, sorting]
  )

  const pagination = useMemo(
    () =>
      usePagination({
        page,
        pageSize,
        rowsLength: filteredRows.length,
      }),
    [page, pageSize, filteredRows]
  )

  const summary = useMemo(
    () =>
      useSummary({
        dataLength: data.length,
        filteredDataLength: filteredRows.length,
        isFiltered,
        page,
        pageSize,
      }),
    [data, filteredRows, page, pageSize]
  )

  return {
    headers,
    rows: slicedRows,
    pagination,
    summary,
    isFiltered,
    handleSorting,
    handleFiltering,
    handlePageSizing,
    handlePageChange: setPage,
  }
}
