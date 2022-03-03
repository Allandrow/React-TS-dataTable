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

export const useTable = ({ columns, data }: TableProps) => {
  const headers = useMemo(() => {
    return columns.map(({ header, id }) => {
      return {
        id,
        text: header,
      }
    })
  }, [columns])

  const rows = useMemo(() => {
    return data.map((row, i) => {
      return {
        key: `row-${i}`,
        data: columns.map(({ id }) => {
          return {
            key: `${id}-${row[id]}`,
            cell: row[id],
          }
        }),
      }
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
