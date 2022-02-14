import { SyntheticEvent } from 'react'
import { Headings } from '../../fixtures/headings'
import { Ordering } from '../../types'

interface TableHeaderProps {
  headings: Headings
  ordering: Ordering
  callback: ({ key, order }: Ordering) => void
}

export const TableHeader = ({ headings, ordering, callback }: TableHeaderProps) => {
  const handleOrderingChange = (e: SyntheticEvent) => {
    let newOrdering

    if (e.currentTarget.classList.contains('sorted')) {
      const order = ordering.order === 'ascending' ? 'ascending' : 'descending'
      newOrdering = {
        key: ordering.key,
        order,
      } as Ordering
    } else {
      const headingText = e.currentTarget.textContent
      const { key } = headings.find((heading) => heading.text === headingText)!
      newOrdering = {
        key,
        order: 'descending',
      } as Ordering
    }

    callback(newOrdering)
  }

  return (
    <thead>
      <tr>
        {headings.map(({ key, text }) => (
          <th
            key={key}
            onClick={handleOrderingChange}
            className={key === ordering.key ? `sorted ${ordering.order}` : undefined}
          >
            {text}
          </th>
        ))}
      </tr>
    </thead>
  )
}
