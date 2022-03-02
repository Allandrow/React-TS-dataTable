import { Data, Sorting } from '../types'

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
    `At least one of the two compared values from key : ${key} are not of type number for this sort. Data involved in sort error : ${a}, ${b}`
  )
}

const sortDate = (a: Data, b: Data, { key, direction }: Sorting) => {
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
    `At least one of the two compared values from key : ${key} are not a valid string date or date object for this sort. Data involved in sort error : ${a}, ${b}`
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
    `At least one of the two compared values from key : ${key} are not of type string for this sort. Data involved in sort error : ${a}, ${b}`
  )
}

const sortingFunctions = new Map()
sortingFunctions.set('sortString', sortString)
sortingFunctions.set('sortNumber', sortNumber)
sortingFunctions.set('sortDate', sortDate)

export { sortingFunctions }
