import { Header } from '../useHeader/useHeader'
import { Data, SortBy } from '../../types'

interface RowsProps {
  data: Data[]
  headers: Header[]
  sorting: SortBy
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

export const useRows = ({ data, headers, sorting }: RowsProps): Rows[] => {
  return data.map((row) => {
    return {
      key: row.key,
      data: headers.map(({ id }) => {
        return {
          key: `${id}-${row[id]}`,
          cellValue: row[id],
          isSorted: id === sorting.id,
        }
      }),
    }
  })
}
