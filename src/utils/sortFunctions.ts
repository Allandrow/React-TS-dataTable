import { Data, SortBy } from '../hooks/useTable/useTable'

type DateFormat = string | Date

const compareValues = <T extends string | number | Date>(
  aValue: T,
  bValue: T,
  direction: string
) => {
  if (aValue < bValue) return direction === 'ascending' ? 1 : -1
  if (aValue > bValue) return direction === 'ascending' ? -1 : 1
  return 0
}

const getError = (a: Data, b: Data, id: string, type: string) => {
  throw new Error(
    `At least one of the two compared values from key : ${id} are not of type ${type} for this sort. Data involved in sort error : ${a}, ${b}`
  )
}

const isDate = (value: unknown) => {
  if (typeof value === 'string') return isFinite(Date.parse(value))
  if (value instanceof Date) return isFinite(value.getTime())

  return false
}

const sortNumber = (a: Data, b: Data, { id, direction }: SortBy) => {
  const aValue = a[id]
  const bValue = b[id]

  if (typeof aValue === 'number' && typeof bValue === 'number') {
    return compareValues(aValue, bValue, direction)
  }

  getError(a, b, id, 'number')
}

const sortDate = (a: Data, b: Data, { id, direction }: SortBy) => {
  const aValue = a[id]
  const bValue = b[id]

  if (isDate(aValue) && isDate(bValue)) {
    const aDate = new Date(aValue as DateFormat)
    const bDate = new Date(bValue as DateFormat)

    return compareValues(aDate, bDate, direction)
  }

  getError(a, b, id, 'date')
}

const sortString = (a: Data, b: Data, { id, direction }: SortBy) => {
  const aValue = a[id]
  const bValue = b[id]

  if (typeof aValue === 'string' && typeof bValue === 'string') {
    return compareValues(aValue, bValue, direction)
  }

  getError(a, b, id, 'string')
}

const sortFunctions = new Map()
sortFunctions.set('sortString', sortString)
sortFunctions.set('sortNumber', sortNumber)
sortFunctions.set('sortDate', sortDate)

export { sortFunctions }
