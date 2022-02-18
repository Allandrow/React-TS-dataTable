import { Employees } from '../../fixtures/employees'
import { TableHeader } from '../tableHeader/TableHeader'
import { Ordering, OrderedHeadings } from '../../types'
import { TableBody } from '../tableBody/TableBody'

interface TableProps extends OrderedHeadings {
  displayedData: Employees | []
  changeOrdering: ({ key, order }: Ordering) => void
}

export const Table = ({
  displayedData,
  headings,
  ordering = { key: headings[0].key, order: 'descending' },
  changeOrdering,
}: TableProps) => {
  const hasData = displayedData.length > 0

  return (
    <table>
      <TableHeader
        headings={headings}
        ordering={ordering}
        changeOrdering={changeOrdering}
      />

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
