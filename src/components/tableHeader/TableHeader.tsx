import { Headings } from '../../fixtures/headings'
import { Ordering } from '../../types'

interface TableHeaderProps {
  headings: Headings
  ordering: Ordering
  callback: () => void
}

export const TableHeader = ({ headings, ordering, callback }: TableHeaderProps) => {
  return (
    <thead>
      <tr>
        {headings.map(({ key, text }) => (
          <th
            key={key}
            onClick={callback}
            className={key === ordering.key ? `sorted ${ordering.order}` : undefined}
          >
            {text}
          </th>
        ))}
      </tr>
    </thead>
  )
}
