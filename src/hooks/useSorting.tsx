import { Column, Data, Sorting } from '../types'

interface SortingProps {
  data: Data[]
  sorting: Sorting
  columns: Column[]
}

const sortNumber = (a: Data, b: Data, { key, direction }: Sorting) => {
  if (+a[key] < +b[key]) return direction === 'ascending' ? 1 : -1
  if (+a[key] > +b[key]) return direction === 'ascending' ? -1 : 1
  return 0
}

const sortDateISO = (a: Data, b: Data, { key, direction }: Sorting) => {
  const aDate = new Date(a[key])
  const bDate = new Date(b[key])

  if (aDate < bDate) return direction === 'ascending' ? 1 : -1
  if (aDate > bDate) return direction === 'ascending' ? -1 : 1
  return 0
}

const sortString = (a: Data, b: Data, { key, direction }: Sorting) => {
  const aString = a[key].toString().toLowerCase()
  const bString = b[key].toString().toLowerCase()

  if (aString < bString) return direction === 'ascending' ? 1 : -1
  if (aString > bString) return direction === 'ascending' ? -1 : 1
  return 0
}

export const useSorting = ({ data, sorting, columns }: SortingProps) => {
  const { sortMethod } = columns.find((column) => column.key === sorting.key)!
  if (sortMethod === 'sortNumber') return data.sort((a, b) => sortNumber(a, b, sorting))
  if (sortMethod === 'sortDateISO') return data.sort((a, b) => sortDateISO(a, b, sorting))
  return data.sort((a, b) => sortString(a, b, sorting))
}
