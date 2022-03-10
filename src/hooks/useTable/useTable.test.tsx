import { renderHook } from '@testing-library/react-hooks'
import { useTable } from './useTable'
import { columns } from '../../../demo/fixtures/columns'
import { sample } from '../../../demo/fixtures/data'

describe('useTable hook', () => {
  test('returns instance object with headers & rows arrays from data & columns', () => {
    const { result } = renderHook(() => useTable({ columns, data: sample }))

    const resultKeys = Object.keys(result.current)
    expect(resultKeys).toHaveLength(6)
  })
})
