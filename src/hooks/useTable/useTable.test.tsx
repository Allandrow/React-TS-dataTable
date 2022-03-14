import { renderHook } from '@testing-library/react-hooks'
import { useTable } from './useTable'
import { columns } from '../../../demo/fixtures/columns'
import { sample } from '../../../demo/fixtures/data'

describe('useTable hook', () => {
  test('returns instance object', () => {
    const { result } = renderHook(() => useTable({ columns, data: sample }))

    const resultKeys = Object.keys(result.current)
    expect(resultKeys).toHaveLength(5)
  })
  test('handleStateChange', () => {
    const { result } = renderHook(() => useTable({ columns, data: sample }))

    const handler = result.current.handleStateChange

    expect(typeof handler).toBe('function')

    //@ts-ignore
    expect(() => handler('invalidMethod', 'test')).toThrowError(/invalidMethod/i)
    expect(handler('filter', 'search test')).toBeUndefined()
    expect(
      handler('sorting', { id: 'firstName', direction: 'ascending' }, false)
    ).toBeUndefined()
  })
})
