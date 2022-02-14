import { Employees } from '../../fixtures/employees'
import { Headings } from '../../fixtures/headings'
import { Ordering } from '../../types'

interface TableBodyProps {
  displayedData: Employees
  headings: Headings
  ordering: Ordering
}

type Employee = {
  [key: string]: string
}

export const TableBody = ({ displayedData, headings, ordering }: TableBodyProps) => {
  return (
    <tbody>
      {displayedData.map((employee: Employee, i) => (
        <tr key={employee.id}>
          {headings.map(({ key }) => (
            <td
              key={`${employee.id}-${key}`}
              className={key === ordering.key ? 'sorted' : undefined}
            >
              {employee[key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
