import { renderHook } from '@testing-library/react-hooks'
import { useTable } from './useTable'
import { columns } from '../../../demo/fixtures/columns'

const dataSample = [
  {
    firstName: 'Alayne',
    lastName: "O'Connolly",
    dateOfBirth: '06/13/1961',
    startDate: '08/24/2016',
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
    street: '4 Doe Crossing Circle',
    city: 'Oklahoma City',
    state: 'OK',
    zipCode: '73104',
  },
]

describe('useTable hook', () => {
  test('returns instance object with headers & rows arrays from data & columns', () => {
    const { result } = renderHook(() => useTable({ columns, data: dataSample }))

    const resultKeys = Object.keys(result.current)
    expect(resultKeys).toHaveLength(2)
    expect(result.current.headers).toHaveLength(9)
    expect(result.current.headers[0].text).toBe('First Name')
    expect(result.current.rows).toHaveLength(3)
    expect(result.current.rows[0].data[0].cell).toBe('Alayne')
    expect(result.current.rows[0].data[0].key).toBe('firstName-Alayne')
    result.current.rows.forEach(({ data }) => {
      expect(data).toHaveLength(9)
    })
  })
})
