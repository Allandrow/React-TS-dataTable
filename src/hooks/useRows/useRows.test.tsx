import { renderHook } from '@testing-library/react-hooks'
import { useRows } from './useRows'
import { Header } from '../useTable/useTable'
import { sample } from '../../../demo/fixtures/data'

const headers: Header[] = [
  {
    id: 'firstName',
    text: 'First Name',
    handleSorting: null,
  },
  { id: 'lastName', text: 'Last Name', handleSorting: null },
  { id: 'dateOfBirth', text: 'Date of Birth', handleSorting: null },
  { id: 'startDate', text: 'Start Date', handleSorting: null },
  { id: 'department', text: 'Department', handleSorting: null },
  { id: 'street', text: 'Street', handleSorting: null },
  { id: 'city', text: 'City', handleSorting: null },
  { id: 'state', text: 'State', handleSorting: null },
  { id: 'zipCode', text: 'Zip Code', handleSorting: null },
]

describe('useRows hook', () => {
  test('Returns rows array', () => {
    const { result } = renderHook(() => useRows({ data: sample, headers }))

    expect(result.current).toHaveLength(3)
    expect(result.current[0].data[0].cellValue).toBe('Alayne')
    expect(result.current[0].data[0].key).toBe('firstName-Alayne')
    result.current.forEach(({ data }) => {
      expect(data).toHaveLength(headers.length)
    })
  })
})
