import { Data, SortBy } from '../hooks/useTable/useTable'

const compareValues = <T extends string | number | Date>(
  aValue: T,
  bValue: T,
  direction: string
) => {
  if (aValue < bValue) return direction === 'ascending' ? 1 : -1
  if (aValue > bValue) return direction === 'ascending' ? -1 : 1
  return 0
}

const throwError = (a: Data, b: Data, id: string, type: string) => {
  throw new Error(
    `At least one of the two compared values from key : ${id} are not of type ${type} for this sort. Data involved in sort error : ${a}, ${b}`
  )
}

const sortNumber = (a: Data, b: Data, { id, direction }: SortBy) => {
  const aValue = a[id]
  const bValue = b[id]

  if (typeof aValue === 'number' && typeof bValue === 'number') {
    return compareValues(aValue, bValue, direction)
  }

  throwError(a, b, id, 'number')
}

const getTimestamp = (value: unknown) => {
  // TODO : throw ici
  // TODO : Compter le nb de chiffres pour voir si le number fourni est en secondes ou milli
  if (typeof value === 'number') return value
  if (typeof value === 'string') return Date.parse(value)
  if (value instanceof Date) return value.getTime()
  return null
}

const sortDateISO = (a: Data, b: Data, { id, direction }: SortBy) => {
  const aValue = getTimestamp(a[id])
  const bValue = getTimestamp(b[id])

  if (aValue && bValue) {
    return compareValues(aValue, bValue, direction)
  }

  throwError(a, b, id, 'date')
}

const sortString = (a: Data, b: Data, { id, direction }: SortBy) => {
  const aValue = a[id]
  const bValue = b[id]

  if (typeof aValue === 'string' && typeof bValue === 'string') {
    return compareValues(aValue, bValue, direction)
  }

  throwError(a, b, id, 'string')
}

const sortFunctions = new Map()
sortFunctions.set('sortString', sortString)
sortFunctions.set('sortNumber', sortNumber)
sortFunctions.set('sortDateISO', sortDateISO)

export { sortFunctions }
