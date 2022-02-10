import { Employees } from '../../fixtures/employees'
import { Headings } from '../../fixtures/headings'

type Ordering = {
  key: string
  order: 'ascending' | 'descending'
}

type TableProps = {
  displayedData: Employees
  headings: Headings
  ordering: Ordering
}

type Employee = {
  [key: string]: string
}

export const Table = ({
  displayedData,
  headings,
  ordering = { key: headings[0].key, order: 'descending' },
}: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          {headings.map(({ key, text }) => (
            <th key={key}>{text}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {displayedData.map((employee: Employee, i) => (
          <tr key={employee.id}>
            {headings.map(({ key }) => (
              <td key={`${employee.id}-${key}`}>{employee[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
