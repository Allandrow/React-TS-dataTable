import { Data, SortedColumns } from '../../types'

export interface TableBodyProps extends SortedColumns {
  displayedData: Data[]
}

export const TableBody = ({ displayedData, columns, sorting }: TableBodyProps) => {
  return (
    <tbody>
      {displayedData.map((item, i) => (
        <tr key={`bodyRow-${i}`}>
          {columns.map(({ key }) => (
            <td key={key + item[key]} className={key === sorting.key ? 'sorted' : ''}>
              {item[key] as string}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
