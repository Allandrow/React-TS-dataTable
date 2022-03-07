import { SyntheticEvent } from 'react'
import { DefaultColumn, Header, SortBy } from '../useTable/useTable'

interface HeaderProps {
  columns: DefaultColumn[]
  sorting: SortBy
  setSorting: (value: SortBy) => void
}

export const useHeader = ({ columns, sorting, setSorting }: HeaderProps): Header[] => {
  const handleSorting = (e: SyntheticEvent) => {
    if (e.currentTarget.classList.contains('sorted')) {
      const direction = sorting.direction === 'ascending' ? 'descending' : 'ascending'
      setSorting({ ...sorting, direction })
    } else {
      const { id } = columns.find(
        (column) => column.header === e.currentTarget.textContent
      )!
      setSorting({ id, direction: 'descending' })
    }
  }

  return columns.map(({ header, id }) => {
    return {
      id: id,
      text: header,
      classNames: sorting.id === id ? ['sorted', sorting.direction] : [],
      clickHandler: (e) => handleSorting(e),
    }
  })
}
