import { renderHook } from '@testing-library/react-hooks'
import { useTable } from './useTable'
import { columns } from '../../../demo/fixtures/columns'

const dataSample = [
  {
    firstName: 'Lani',
    lastName: 'Beecraft',
    department: 'Research and Development',
    dateOfBirth: '2/13/1968',
    startDate: '6/2/2021',
    street: '68382 Grasskamp Park',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98140',
  },
  {
    firstName: 'Analise',
    lastName: 'Verrechia',
    department: 'Business Development',
    dateOfBirth: '5/27/1997',
    startDate: '7/17/2021',
    street: '397 Thompson Circle',
    city: 'Lynn',
    state: 'MA',
    zipCode: '01905',
  },
  {
    firstName: 'Valentino',
    lastName: 'Rubinovitsch',
    department: 'Human Resources',
    dateOfBirth: '5/1/1990',
    startDate: '6/13/2021',
    street: '29 Caliangt Street',
    city: 'Ogden',
    state: 'UT',
    zipCode: '84403',
  },
]

describe('useTable hook', () => {
  test('returns instance object with headers & rows arrays from data & columns', () => {
    const { result } = renderHook(() => useTable({ columns, data: dataSample }))

    const resultKeys = Object.keys(result.current)
    expect(resultKeys).toHaveLength(2)
    expect(result.current.headers).toHaveLength(9)
    expect(result.current.headers[0]).toBe('First Name')
    expect(result.current.rows).toHaveLength(3)
    expect(result.current.rows[0][0]).toBe('Lani')
    result.current.rows.forEach((row) => {
      expect(row).toHaveLength(9)
    })
  })
})
