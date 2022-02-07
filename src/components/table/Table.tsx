import { Data } from '../../fixtures/data'
import { Headings } from '../../fixtures/headings'

type TableProps = {
  displayedData: Data
  headings: Headings
}

type Employee = {
  [key: string]: string
}

export const Table = ({ displayedData, headings }: TableProps) => {
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
          <tr key={i}>
            {headings.map(({ key }) => (
              <td key={key}>{employee[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
