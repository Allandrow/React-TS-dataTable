import { Data, SortBy, UserSortMethod } from '../../src/types'

export const customStringSort: UserSortMethod = (
  a: Data,
  b: Data,
  { id, direction }: SortBy
) => {
  const aValue = a[id] as string
  const bValue = b[id] as string
  if (direction === 'descending') {
    return aValue.localeCompare(bValue)
  }

  return bValue.localeCompare(aValue)
}
