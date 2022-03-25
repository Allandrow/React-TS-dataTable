import { Row } from '../../../src/types'

interface TableBodyProps {
  rows: Row[]
  length: number
  isFiltered: boolean
}

export const TableBody = ({ rows, length, isFiltered }: TableBodyProps) => {
  const hasNoData = rows.length === 0 && !isFiltered
  const hasNoFilteredData = rows.length === 0 && isFiltered

  return (
    <tbody>
      {hasNoData && (
        <tr>
          <td colSpan={length} className="empty">
            No data available in table
          </td>
        </tr>
      )}
      {hasNoFilteredData && (
        <tr>
          <td colSpan={length} className="empty">
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
  )
}
