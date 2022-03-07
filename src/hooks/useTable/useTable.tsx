import { SyntheticEvent, useMemo, useState } from 'react'
import { useHeader } from '../useHeader/useHeader'
import { useRows } from '../useRows/useRows'

export type Data = Record<string, unknown>

export interface DefaultColumn {
  id: string
  header: string
  sortMethod?: string
}

interface TableProps {
  columns: DefaultColumn[]
  data: Data[]
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
  clickHandler: (e: SyntheticEvent) => void
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

export const useTable = ({ columns, data }: TableProps) => {
  const [sorting, setSorting] = useState<SortBy>({
    id: columns[0].id,
    direction: 'descending',
  })

  const headers = useMemo(
    () => useHeader({ columns, sorting, setSorting }),
    [columns, sorting]
  )
  const rows = useMemo(
    () => useRows({ data, headers, sorting }),
    [data, headers, sorting]
  )

  return {
    headers,
    rows,
  }
}

/*

Add in each header a callback function that allows changing sorting object on header click

*/
