import { DefaultColumn, SortBy } from '../../types'

interface HeaderProps {
  columns: DefaultColumn[]
  sorting: SortBy
}

export interface Header {
  id: string
  displayText: string
  isSorted: boolean
  sortingDirection: 'ascending' | 'descending'
}

export const useHeader = ({ columns, sorting }: HeaderProps): Header[] => {
  return columns.map(({ displayText, id }) => {
    return {
      id: id,
      displayText,
      isSorted: sorting.id === id,
      sortingDirection: sorting.direction,
    }
  })
}
