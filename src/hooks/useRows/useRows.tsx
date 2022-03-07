import { Data, Header, Rows, SortBy } from '../useTable/useTable'

interface RowsProps {
  data: Data[]
  headers: Header[]
  sorting: SortBy
}

export const useRows = ({ data, headers, sorting }: RowsProps): Rows[] => {
  return data.map((row, i) => {
    return {
      key: `row-${i}`,
      data: headers.map(({ id }) => {
        return {
          key: `${id}-${row[id]}`,
          cell: row[id],
          classNames: sorting.id === id ? ['sorted'] : [],
        }
      }),
    }
  })
}
