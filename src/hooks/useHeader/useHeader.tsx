import { DefaultColumn, SortBy } from '../../types'

interface HeaderProps {
  columns: DefaultColumn[]
  sorting: SortBy
}

export interface Header {
  id: string
  displayText: string
  isSorted?: boolean
  sortingDirection?: 'ascending' | 'descending'
}

export const useHeader = ({ columns, sorting }: HeaderProps): Header[] => {
  return columns.map(({ displayText, id }) => {
    const header = {
      id,
      displayText,
    }

    if (sorting.id === id) {
      return {
        ...header,
        isSorted: true,
        sortingDirection: sorting.direction,
      }
    }

    return header
  })
}
