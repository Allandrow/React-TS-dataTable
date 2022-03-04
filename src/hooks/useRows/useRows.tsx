import { Data, Header, OptionsList, Rows } from '../useTable/useTable'

interface RowsProps {
  data: Data[]
  headers: Header[]
  features: Partial<OptionsList>
}

export const useRows = ({ data, headers, features }: RowsProps): Rows[] => {
  return data.map((row, i) => {
    return {
      key: `row-${i}`,
      data: headers.map(({ id }) => {
        return {
          key: `${id}-${row[id]}`,
          cell: row[id],
          classNames: features.sortBy?.id === id ? ['sorted'] : [],
        }
      }),
    }
  })
}
