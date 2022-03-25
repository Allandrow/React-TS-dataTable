import { HandleSorting, Header } from '../../../src/types'

interface TableHeaderProps {
  headers: Header[]
  handleSorting: HandleSorting
}

export const TableHeader = ({ headers, handleSorting }: TableHeaderProps) => {
  const handleSortingEvent = ({ id, isSorted, sortingDirection }: Header) => {
    if (isSorted) {
      handleSorting({
        id,
        direction: sortingDirection === 'ascending' ? 'descending' : 'ascending',
      })
    } else {
      handleSorting({ id, direction: 'descending' })
    }
  }

  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th
            key={header.id}
            className={header.isSorted ? `sorted ${header.sortingDirection}` : ''}
            onClick={() => handleSortingEvent(header)}
          >
            {header.displayText}
          </th>
        ))}
      </tr>
    </thead>
  )
}
