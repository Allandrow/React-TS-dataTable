import { Data } from '../../fixtures/data'
import { Headings } from '../../fixtures/headings'

type TableProps = {
  displayedData: Data
  headings: Headings
}

export const Table = ({ displayedData, headings }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          {headings.map(({ key, text }, i) => (
            <th key={key}>{text}</th>
          ))}
        </tr>
      </thead>
    </table>
  )
}
