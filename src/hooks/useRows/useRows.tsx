import { Header, Data, SortBy } from '../../types'

interface RowsProps {
  data: Data[]
  headers: Header[]
  sorting: SortBy
}

interface Cell {
  key: string
  cellValue: unknown
  isSorted: boolean
}

export interface Row {
  key: string
  data: Cell[]
}

export const useRows = ({ data, headers, sorting }: RowsProps): Row[] => {
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
