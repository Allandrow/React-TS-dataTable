import { Data, Header, Rows } from '../useTable/useTable'

interface RowsProps {
  data: Data[]
  headers: Header[]
}

export const useRows = ({ data, headers }: RowsProps): Rows[] => {
  return data.map((row, i) => {
    return {
      key: `row-${i}`,
      data: headers.map(({ id }) => {
        return {
          key: `${id}-${row[id]}`,
          cell: row[id],
        }
      }),
    }
  })
}
