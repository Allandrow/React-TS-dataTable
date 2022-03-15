import { useMemo, useState } from 'react'
import { useFiltering } from '../useFiltering/useFiltering'
import { Header, useHeader } from '../useHeader/useHeader'
import { PaginationParams, usePagination } from '../usePagination/usePagination'
import { SummaryValues, useSummary } from '../useSummary/useSummary'
import { Rows, useRows } from '../useRows/useRows'
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

interface TableHookProps {
  columns: DefaultColumn[]
  data: Data[]
  pageSizeOptions?: number[]
}

export interface SortBy {
  id: string
  direction: 'ascending' | 'descending'
}

export interface StateChangeOptions {
  resetPage: boolean
}

export type HandleSorting = (sorting: SortBy, options?: StateChangeOptions) => void
export type HandleFiltering = (value: string, options?: StateChangeOptions) => void
export type HandlePageSizing = (value: number, options?: StateChangeOptions) => void

export interface UseTableValues {
  headers: Header[]
  rows: Rows[]
  pagination: PaginationParams | null
  summary: SummaryValues
  handleSorting: HandleSorting
  handleFiltering: HandleFiltering
  handlePageSizing: HandlePageSizing
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

  const pagination = useMemo(
    () =>
      usePagination({
        page,
        pageSize,
        rowsLength: rows.length,
        setPage,
      }),
    [page, pageSize, rows]
  )

  const summary = useMemo(
    () =>
      useSummary({
        dataLength: data.length,
        filteredDataLength: filteredData.length,
        page,
        pageSize,
      }),
    [data, filteredData, page, pageSize]
  )

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
