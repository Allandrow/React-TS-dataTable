import { Data, SortBy } from '../types'

const compareValues = <T extends string | number | Date>(
  aValue: T,
  bValue: T,
  direction: string
) => {
  if (aValue < bValue) return direction === 'ascending' ? 1 : -1
  if (aValue > bValue) return direction === 'ascending' ? -1 : 1
  return 0
}

const throwTypeComparisonError = (id: string, type: string) => {
  throw new Error(
    `At least one of the two compared values from key : ${id} are not of type ${type} for this sort.`
  )
}

const sortNumber = (a: Data, b: Data, { id, direction }: SortBy) => {
  const aValue = a[id]
  const bValue = b[id]

  if (typeof aValue === 'number' && typeof bValue === 'number') {
    return compareValues(aValue, bValue, direction)
  }

  throwTypeComparisonError(id, 'number')
}

const getTimestamp = (value: unknown) => {
  if (typeof value === 'number') return new Date(value).getTime()
  if (typeof value === 'string') return Date.parse(value)
  if (value instanceof Date) return value.getTime()

  throw new Error(
    `type of ${value} can't be used as comparison for date values. Type is ${typeof value}.
    Types accepted : number(milliseconds timestamp), string(ISO dateString), date Object`
  )
}

const sortDateISO = (a: Data, b: Data, { id, direction }: SortBy) => {
  const aValue = getTimestamp(a[id])
  const bValue = getTimestamp(b[id])

  if (aValue && bValue) {
    return compareValues(aValue, bValue, direction)
  }
}

const sortString = (a: Data, b: Data, { id, direction }: SortBy) => {
  const aValue = a[id]
  const bValue = b[id]

  if (typeof aValue === 'string' && typeof bValue === 'string') {
    return compareValues(aValue, bValue, direction)
  }

  throwTypeComparisonError(id, 'string')
}

const sortFunctions = new Map()
sortFunctions.set('sortString', sortString)
sortFunctions.set('sortNumber', sortNumber)
sortFunctions.set('sortDateISO', sortDateISO)

export { sortFunctions }
