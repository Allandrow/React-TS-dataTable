import { SyntheticEvent } from 'react'
import { Sorting, SortedColumns } from '../../types'

export interface TableHeaderProps extends SortedColumns {
  changeSorting: ({ key, direction }: Sorting) => void
}

export const TableHeader = ({ columns, sorting, changeSorting }: TableHeaderProps) => {
  const handleOrderingChange = (e: SyntheticEvent) => {
    // sorting was already done on target column : invert ordering
    if (e.currentTarget.classList.contains('sorted')) {
      const direction = sorting.direction === 'ascending' ? 'descending' : 'ascending'
      changeSorting({
        ...sorting,
        direction,
      } as Sorting)
    } else {
      const { key } = columns.find(
        (column) => column.header === e.currentTarget.textContent
      )!
      changeSorting({
        key,
        direction: 'descending',
      } as Sorting)
    }
  }

  return (
    <thead>
      <tr>
        {columns.map(({ key, header }) => (
          <th
            key={key}
            onClick={handleOrderingChange}
            className={key === sorting.key ? `sorted ${sorting.direction}` : ''}
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  )
}
