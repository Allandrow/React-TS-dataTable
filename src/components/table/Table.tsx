import { Employees } from '../../fixtures/employees'
import { TableHeader } from '../tableHeader/TableHeader'
import { Ordering, OrderedHeadings } from '../../types'
import { TableBody } from '../tableBody/TableBody'

interface DisplayedData {
  filtered: boolean
  data: Employees | []
}

interface TableProps extends OrderedHeadings {
  displayedData: DisplayedData
  changeOrdering: ({ key, order }: Ordering) => void
}

export const Table = ({
  displayedData,
  headings,
  ordering = { key: headings[0].key, order: 'descending' },
  changeOrdering,
}: TableProps) => {
  const { data, filtered } = displayedData
  const hasData = data.length > 0

  return (
    <table>
      <TableHeader
        headings={headings}
        ordering={ordering}
        changeOrdering={changeOrdering}
      />

      {hasData && (
        <TableBody displayedData={data} headings={headings} ordering={ordering} />
      )}

      {!hasData && (
        <tbody>
          <tr>
            <td colSpan={headings.length} className="empty">
              {filtered ? 'No matching records found' : 'No data available in table'}
            </td>
          </tr>
        </tbody>
      )}
    </table>
  )
}
