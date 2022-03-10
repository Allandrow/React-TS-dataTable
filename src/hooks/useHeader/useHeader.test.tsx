import { vi } from 'vitest'
import { renderHook } from '@testing-library/react-hooks'
import { columns } from '../../../demo/fixtures/columns'
import { SortBy } from '../useTable/useTable'
import { useHeader } from './useHeader'

const sorting: SortBy = { id: 'firstName', direction: 'descending' }

const handleSorting = vi.fn()

describe('useHeader hook', () => {
  test('Returns headers array', () => {
    const { result } = renderHook(() => useHeader({ columns, sorting, handleSorting }))

    expect(result.current).toHaveLength(9)
    expect(result.current[0].text).toBe('First Name')
  })
})
