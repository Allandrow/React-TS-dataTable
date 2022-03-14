import { HandleStateChange, Header, Rows } from '../../../src/hooks/useTable/useTable'

interface TableProps {
  headers: Header[]
  rows: Rows[]
  handleStateChange: HandleStateChange
}

export const Table = ({ headers, rows, handleStateChange }: TableProps) => {
  const handleSorting = ({ id, isSorted, sortingDirection }: Header) => {
    if (isSorted) {
      handleStateChange('sorting', {
        id,
        direction: sortingDirection === 'ascending' ? 'descending' : 'ascending',
      })
    } else {
      handleStateChange('sorting', { id, direction: 'descending' })
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
              onClick={() => handleSorting(header)}
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
