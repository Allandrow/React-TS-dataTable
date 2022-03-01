import { Column, Data, Sorting } from '../types'

interface SortingProps {
  data: Data[]
  sorting: Sorting
  columns: Column[]
}

const isDate = (value: unknown) => {
  if (typeof value === 'string') {
    return isFinite(Date.parse(value))
  }
  if (value instanceof Date) {
    return isFinite(value.getTime())
  }

  return false
}

const sortNumber = (a: Data, b: Data, { key, direction }: Sorting) => {
  const aValue = a[key]
  const bValue = b[key]

  if (typeof aValue === 'number' && typeof bValue === 'number') {
    if (aValue < bValue) return direction === 'ascending' ? 1 : -1
    if (aValue > bValue) return direction === 'ascending' ? -1 : 1
    return 0
  }

  throw new Error(
    `At least one of the two compared values from key : ${key} are not of type number for this sort.`
  )
}

const sortDateISO = (a: Data, b: Data, { key, direction }: Sorting) => {
  const aValue = a[key]
  const bValue = b[key]

  if (isDate(aValue) && isDate(bValue)) {
    const aDate = new Date(aValue as string | Date)
    const bDate = new Date(bValue as string | Date)

    if (aDate < bDate) return direction === 'ascending' ? 1 : -1
    if (aDate > bDate) return direction === 'ascending' ? -1 : 1
    return 0
  }

  throw new Error(
    `At least one of the two compared values from key : ${key} are not a valid string date or date object for this sort.`
  )
}

const sortString = (a: Data, b: Data, { key, direction }: Sorting) => {
  const aValue = a[key]
  const bValue = b[key]

  if (typeof aValue === 'string' && typeof bValue === 'string') {
    const aString = aValue.toLowerCase()
    const bString = bValue.toLowerCase()

    if (aString < bString) return direction === 'ascending' ? 1 : -1
    if (aString > bString) return direction === 'ascending' ? -1 : 1
    return 0
  }

  throw new Error(
    `At least one of the two compared values from key : ${key} are not of type string for this sort.`
  )
}

export const useSorting = ({ data, sorting, columns }: SortingProps) => {
  const { sortMethod } = columns.find((column) => column.key === sorting.key)!

  if (sortMethod === 'sortNumber') return data.sort((a, b) => sortNumber(a, b, sorting))
  if (sortMethod === 'sortDateISO') return data.sort((a, b) => sortDateISO(a, b, sorting))

  return data.sort((a, b) => sortString(a, b, sorting))
}
