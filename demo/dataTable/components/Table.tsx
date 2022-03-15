import { Header } from '../../../src/hooks/useHeader/useHeader'
import { Rows } from '../../../src/hooks/useRows/useRows'
import { HandleSorting } from '../../../src/hooks/useTable/useTable'

interface TableProps {
  headers: Header[]
  rows: Rows[]
  isFiltered: boolean
  handleSorting: HandleSorting
}

export const Table = ({ headers, rows, isFiltered, handleSorting }: TableProps) => {
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

  const hasNoData = rows.length === 0 && !isFiltered
  const hasNoFilteredData = rows.length === 0 && isFiltered

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
        {hasNoData && (
          <tr>
            <td colSpan={headers.length} className="empty">
              No data available in table
            </td>
          </tr>
        )}
        {hasNoFilteredData && (
          <tr>
            <td colSpan={headers.length} className="empty">
              No matching records found
            </td>
          </tr>
        )}
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
