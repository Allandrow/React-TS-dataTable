import { DefaultColumn, SortBy } from '../useTable/useTable'

interface HeaderProps {
  columns: DefaultColumn[]
  sorting: SortBy
}

export interface Header {
  id: string
  text: string
  isSorted: boolean
  sortingDirection: 'ascending' | 'descending'
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
