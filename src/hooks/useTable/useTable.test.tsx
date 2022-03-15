import { renderHook } from '@testing-library/react-hooks'
import { useTable } from './useTable'
import { columns, data, employees, headers as fixtureHeaders } from '../../fixtures'

describe('useTable', () => {
  test('Get Table Instance', () => {
    const { result } = renderHook(() => useTable({ columns, data }))

    expect(Object.keys(result.current)).toHaveLength(7)

    const { headers, rows, pagination, summary } = result.current

    expect(headers).toStrictEqual(fixtureHeaders)

    const sortedHeader = headers.find((header) => header.isSorted)

    rows.forEach((row, i) => {
      expect(Object.keys(row)).toHaveLength(2)
      expect(row.data).toHaveLength(fixtureHeaders.length)

      if (row.data[i].isSorted) {
        expect(headers.indexOf(sortedHeader)).toEqual(i)
      }
    })

    expect(pagination.firstPage).toBe(1)
    expect(pagination.lastPage).toBe(1)
    expect(pagination.page).toBe(1)

    expect(summary.originalLength).toEqual(summary.filteredLength)
    expect(summary.firstIndex).toBe(1)
    expect(summary.lastIndex).toBe(3)
    expect(summary.isFiltered).toBe(false)
  })

  test('Modifying sorting', () => {
    const { result } = renderHook(() => useTable({ columns, data: employees }))

    result.current.pagination.setPage(2)
    result.current.handleSorting({ id: 'firstName', direction: 'ascending' })

    expect(result.current.rows[0].data[0].cellValue).toBe('Zaria')
    expect(result.current.rows[0].data[0].isSorted).toBe(true)
    expect(result.current.pagination.page).toBe(1)

    result.current.handleSorting({ id: 'zipCode', direction: 'descending' })

    expect(result.current.rows[0].data[8].cellValue).toBe('01105')
    expect(result.current.rows[0].data[1].isSorted).toBe(false)
    expect(result.current.rows[1].data[8].isSorted).toBe(true)
  })

  test('Modifying filtering', () => {
    const { result } = renderHook(() => useTable({ columns, data: employees }))

    result.current.pagination.setPage(3)

    expect(result.current.pagination.page).toBe(3)

    result.current.handleFiltering('Austin')

    expect(result.current.rows).toHaveLength(3)

    result.current.handleFiltering('development')

    expect(result.current.rows).toHaveLength(10)
    expect(result.current.summary.filteredLength).toBe(12)
    expect(result.current.pagination.lastPage).toBe(2)
    expect(result.current.pagination.page).toBe(1)
  })

  test('Modifying page size', () => {
    const { result } = renderHook(() => useTable({ columns, data: employees }))

    result.current.pagination.setPage(3)

    result.current.handlePageSizing(50)

    expect(result.current.pagination.lastPage).toBe(2)
    expect(result.current.summary.lastIndex).toBe(50)
    expect(result.current.rows).toHaveLength(50)
    expect(result.current.pagination.page).toBe(1)
  })
})
