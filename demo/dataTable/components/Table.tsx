import { Header, Rows } from '../../../src/hooks/useTable/useTable'

interface TableProps {
  headers: Header[]
  rows: Rows[]
}

export const Table = ({ headers, rows }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map(({ id, text, classNames, clickHandler }) => (
            <th key={id} className={classNames.join(' ')} onClick={clickHandler}>
              {text}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(({ data, key }) => (
          <tr key={key}>
            {data.map(({ cell, key, classNames }) => (
              <td key={key} className={classNames.join(' ')}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
