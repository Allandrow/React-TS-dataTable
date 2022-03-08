import { renderHook } from '@testing-library/react-hooks'
import { useRows } from './useRows'
import { Header, SortBy } from '../useTable/useTable'

const data = [
  {
    firstName: 'Alayne',
    lastName: "O'Connolly",
    dateOfBirth: '06/13/1961',
    startDate: '08/24/2016',
    department: 'Business',
    street: '23554 Maple Parkway',
    city: 'Austin',
    state: 'TX',
    zipCode: '78715',
  },
  {
    firstName: 'Amalie',
    lastName: 'Nanetti',
    dateOfBirth: '09/14/1994',
    startDate: '03/31/2017',
    department: 'Business',
    street: '4727 Mosinee Plaza',
    city: 'Saint Petersburg',
    state: 'FL',
    zipCode: '33715',
  },
  {
    firstName: 'Vita',
    lastName: 'Maciaszek',
    dateOfBirth: '02/23/1976',
    startDate: '04/20/2017',
    department: 'Business',
    street: '4 Doe Crossing Circle',
    city: 'Oklahoma City',
    state: 'OK',
    zipCode: '73104',
  },
]

const headers: Header[] = [
  {
    id: 'firstName',
    text: 'First Name',
    classNames: ['sorted', 'descending'],
    clickHandler: null,
  },
  { id: 'lastName', text: 'Last Name', classNames: [], clickHandler: null },
  { id: 'dateOfBirth', text: 'Date of Birth', classNames: [], clickHandler: null },
  { id: 'startDate', text: 'Start Date', classNames: [], clickHandler: null },
  { id: 'department', text: 'Department', classNames: [], clickHandler: null },
  { id: 'street', text: 'Street', classNames: [], clickHandler: null },
  { id: 'city', text: 'City', classNames: [], clickHandler: null },
  { id: 'state', text: 'State', classNames: [], clickHandler: null },
  { id: 'zipCode', text: 'Zip Code', classNames: [], clickHandler: null },
]

const sorting: SortBy = { id: 'firstName', direction: 'descending' }

describe('useRows hook', () => {
  test('Returns rows array', () => {
    const { result } = renderHook(() => useRows({ data, headers, sorting }))

    expect(result.current).toHaveLength(3)
    expect(result.current[0].data[0].cell).toBe('Alayne')
    expect(result.current[0].data[0].key).toBe('firstName-Alayne')
    expect(result.current[0].data[0].classNames).toContain('sorted')
    result.current.forEach(({ data }) => {
      expect(data).toHaveLength(9)
    })
  })
})
