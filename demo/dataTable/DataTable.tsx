import { useTable } from '../../src/hooks/useTable/useTable'
import { columns } from '../fixtures/columns'
import { employees } from '../fixtures/employees'

export const DataTable = () => {
  const { headers, rows } = useTable({ columns, data: employees })

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={`row${i}`}>
            {row.map((cell, i) => (
              <td key={`cell${i}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// TODO : keys
