import { SyntheticEvent } from 'react'
import { Headings } from '../../fixtures/headings'
import { Ordering } from '../../types'

interface TableHeaderProps {
  headings: Headings
  ordering: Ordering
  changeOrdering: ({ key, order }: Ordering) => void
}

export const TableHeader = ({ headings, ordering, changeOrdering }: TableHeaderProps) => {
  const handleOrderingChange = (e: SyntheticEvent) => {
    let newOrdering

    if (e.currentTarget.classList.contains('sorted')) {
      const order = ordering.order === 'ascending' ? 'descending' : 'ascending'
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

    changeOrdering(newOrdering)
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
