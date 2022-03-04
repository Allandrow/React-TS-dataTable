import { useMemo } from 'react'
import { useFeaturesValues } from '../useFeaturesValues/useFeaturesValues'
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

export const useTable = (
  { columns, data }: TableProps,
  options?: Partial<OptionsList>
) => {
  // build initial state of features depending if they are not disabled and/or modified from default
  const features = useMemo(
    () => useFeaturesValues({ columns, options }),
    [data, columns, options]
  )

  const headers = useMemo(() => useHeader({ columns, features }), [columns, features])
  const rows = useMemo(
    () => useRows({ data, headers, features }),
    [data, headers, features]
  )

  return {
    headers,
    rows,
  }
}
