import { TableHeader } from '../tableHeader/TableHeader'
import { Sorting, Data, SortedColumns } from '../../types'
import { TableBody } from '../tableBody/TableBody'

export interface DisplayedData {
  filtered: boolean
  data: Data[] | []
}

export interface TableProps extends SortedColumns {
  displayedData: DisplayedData
  changeSorting: ({ key, direction }: Sorting) => void
}

export const Table = ({
  displayedData,
  columns,
  sorting = { key: columns[0].key, direction: 'descending' },
  changeSorting,
}: TableProps) => {
  const { data, filtered } = displayedData
  const hasData = data.length > 0

  return (
    <table>
      <TableHeader columns={columns} sorting={sorting} changeSorting={changeSorting} />

      {hasData && <TableBody displayedData={data} columns={columns} sorting={sorting} />}

      {!hasData && (
        <tbody>
          <tr>
            <td colSpan={columns.length} className="empty">
              {filtered ? 'No matching records found' : 'No data available in table'}
            </td>
          </tr>
        </tbody>
      )}
    </table>
  )
}
