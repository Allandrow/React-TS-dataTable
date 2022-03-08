import { SyntheticEvent } from 'react'
import { DefaultColumn, Header, SortBy } from '../useTable/useTable'

interface HeaderProps {
  columns: DefaultColumn[]
  sorting: SortBy
  handleSorting: (value: SortBy) => void
}

export const useHeader = ({ columns, sorting, handleSorting }: HeaderProps): Header[] => {
  const handleSortEvent = (e: SyntheticEvent) => {
    if (e.currentTarget.classList.contains('sorted')) {
      const direction = sorting.direction === 'ascending' ? 'descending' : 'ascending'
      handleSorting({ ...sorting, direction })
    } else {
      const { id } = columns.find(
        (column) => column.header === e.currentTarget.textContent
      )!
      handleSorting({ id, direction: 'descending' })
    }
  }

  return columns.map(({ header, id }) => {
    return {
      id: id,
      text: header,
      classNames: sorting.id === id ? ['sorted', sorting.direction] : [],
      handleSortEvent,
    }
  })
}
