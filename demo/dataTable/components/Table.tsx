import { Header } from '../../../src/hooks/useHeader/useHeader'
import { HandleSorting, Rows } from '../../../src/hooks/useTable/useTable'

interface TableProps {
  headers: Header[]
  rows: Rows[]
  handleSorting: HandleSorting
}

export const Table = ({ headers, rows, handleSorting }: TableProps) => {
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
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header.id}
              className={header.isSorted ? `sorted ${header.sortingDirection}` : ''}
              onClick={() => handleSortingEvent(header)}
            >
              {header.text}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(({ data, key }) => (
          <tr key={key}>
            {data.map(({ cellValue, key, isSorted }) => (
              <td key={key} className={isSorted ? 'sorted' : ''}>
                {cellValue}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
