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

export interface OptionsList {
  sortBy: SortBy
  disabled: string[]
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

  const handleSorting = (sorting: SortBy, { resetPage = true }: StateChangeOptions) => {
    setSorting(sorting)
    handlePageReset(resetPage)
  }

  const handleFiltering = (value: string, { resetPage = true }: StateChangeOptions) => {
    setFilter(value)
    handlePageReset(resetPage)
  }

  const handlePageSizing = (value: number, { resetPage = true }: StateChangeOptions) => {
    setPageSize(value)
    handlePageReset(resetPage)
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
