import { DefaultColumn, Header, SortBy } from '../useTable/useTable'

interface HeaderProps {
  columns: DefaultColumn[]
  sorting: SortBy
}

export const useHeader = ({ columns, sorting }: HeaderProps): Header[] => {
  return columns.map(({ header, id }) => {
    return {
      id: id,
      text: header,
      isSorted: sorting.id === id,
      sortingDirection: sorting.direction,
    }
  })
}
