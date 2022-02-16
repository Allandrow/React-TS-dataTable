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
      {displayedData.map((item: Employee) => (
        <tr key={Object.values(item).reduce((key, value) => (key += value), '')}>
          {headings.map(({ key }) => (
            <td
              key={key + item[key]}
              className={key === ordering.key ? 'sorted' : undefined}
            >
              {item[key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
