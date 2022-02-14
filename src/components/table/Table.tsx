import { Employees } from '../../fixtures/employees'
import { Headings } from '../../fixtures/headings'
import { TableHeader } from '../tableHeader/TableHeader'
import { Ordering } from '../../types'
import { TableBody } from '../tableBody/TableBody'

type TableProps = {
  displayedData: Employees | []
  headings: Headings
  ordering: Ordering
  callback: () => void
}

export const Table = ({
  displayedData,
  headings,
  ordering = { key: headings[0].key, order: 'descending' },
  callback,
}: TableProps) => {
  const hasData = displayedData.length > 0

  return (
    <table>
      <TableHeader headings={headings} ordering={ordering} callback={callback} />

      {hasData && (
        <TableBody
          displayedData={displayedData}
          headings={headings}
          ordering={ordering}
        />
      )}

      {!hasData && (
        <tbody>
          <tr>
            <td colSpan={headings.length}>No data available in table</td>
          </tr>
        </tbody>
      )}
    </table>
  )
}
