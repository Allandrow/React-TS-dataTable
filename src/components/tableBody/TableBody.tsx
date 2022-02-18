import { Employees } from '../../fixtures/employees'
import { HeadingRelatedValue, OrderedHeadings } from '../../types'

interface TableBodyProps extends OrderedHeadings {
  displayedData: Employees
}

export const TableBody = ({ displayedData, headings, ordering }: TableBodyProps) => {
  return (
    <tbody>
      {displayedData.map((item: HeadingRelatedValue) => (
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
