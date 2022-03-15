import { Header } from '../useHeader/useHeader'
import { Data, Rows, SortBy } from '../useTable/useTable'

interface RowsProps {
  data: Data[]
  headers: Header[]
  sorting: SortBy
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
