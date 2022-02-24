import { Data, SortedColumns } from '../../types'

export interface TableBodyProps extends SortedColumns {
  displayedData: Data[]
}

export const TableBody = ({ displayedData, columns, sorting }: TableBodyProps) => {
  return (
    <tbody>
      {displayedData.map((item) => (
        <tr
          key={Object.values(item).reduce((key, value) => (key += value.toString()), '')}
        >
          {columns.map(({ key }) => (
            <td key={key + item[key]} className={key === sorting.key ? 'sorted' : ''}>
              {item[key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
