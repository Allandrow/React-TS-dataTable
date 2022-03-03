import { useMemo } from 'react'

export interface DefaultColumn {
  id: string
  header: string
  sortMethod?: string
}

export type Data = Record<string, unknown>

export interface TableProps {
  columns: DefaultColumn[]
  data: Data[]
}

export type Row = unknown[]

export const useTable = ({ columns, data }: TableProps) => {
  const headers = useMemo(() => {
    return columns.map(({ header }) => header)
  }, [columns])
  const rows = useMemo(() => {
    return data.map((item) => {
      return columns.map(({ id }) => {
        return item[id]
      })
    })
  }, [columns, data])

  const instance = useMemo(() => {
    return {
      headers,
      rows,
    }
  }, [rows])

  return instance
}
