import { renderHook } from '@testing-library/react-hooks'
import { useRows } from './useRows'
import { Header, SortBy } from '../useTable/useTable'
import { sample } from '../../../demo/fixtures/data'

const headers: Header[] = [
  {
    id: 'firstName',
    text: 'First Name',
    isSorted: true,
    sortingDirection: 'descending',
  },
  { id: 'lastName', text: 'Last Name', isSorted: false, sortingDirection: 'descending' },
  {
    id: 'dateOfBirth',
    text: 'Date of Birth',
    isSorted: false,
    sortingDirection: 'descending',
  },
  {
    id: 'startDate',
    text: 'Start Date',
    isSorted: false,
    sortingDirection: 'descending',
  },
  {
    id: 'department',
    text: 'Department',
    isSorted: false,
    sortingDirection: 'descending',
  },
  { id: 'street', text: 'Street', isSorted: false, sortingDirection: 'descending' },
  { id: 'city', text: 'City', isSorted: false, sortingDirection: 'descending' },
  { id: 'state', text: 'State', isSorted: false, sortingDirection: 'descending' },
  { id: 'zipCode', text: 'Zip Code', isSorted: false, sortingDirection: 'descending' },
]

const sorting: SortBy = { id: 'firstName', direction: 'descending' }

describe('useRows hook', () => {
  test('Returns rows array', () => {
    const { result } = renderHook(() => useRows({ data: sample, headers, sorting }))

    expect(result.current).toHaveLength(3)
    expect(result.current[0].data[0].cellValue).toBe('Alayne')
    expect(result.current[0].data[0].key).toBe('firstName-Alayne')
    result.current.forEach(({ data }) => {
      expect(data).toHaveLength(headers.length)
    })
  })
})
