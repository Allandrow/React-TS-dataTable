import { Data, Header, Rows } from '../useTable/useTable'

interface RowsProps {
  data: Data[]
  headers: Header[]
}

export const useRows = ({ data, headers }: RowsProps): Rows[] => {
  return data.map((row) => {
    return {
      key: row.key,
      data: headers.map(({ id }) => {
        return {
          key: `${id}-${row[id]}`,
          cellValue: row[id],
        }
      }),
    }
  })
}
