import { useTable } from '../../src/hooks/useTable/useTable'
import { columns } from '../fixtures/columns'
import { employees } from '../fixtures/employees'

export const DataTable = () => {
  const { headers, rows } = useTable({ columns, data: employees })

  return (
    <table>
      <thead>
        <tr>
          {headers.map(({ id, text, classNames }) => (
            <th key={id} className={classNames.join(' ')}>
              {text}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(({ data, key }) => (
          <tr key={key}>
            {data.map(({ cell, key, classNames }) => (
              <td key={key} className={classNames.join(' ')}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
