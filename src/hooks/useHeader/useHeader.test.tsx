import { renderHook } from '@testing-library/react-hooks'
import { useHeader } from './useHeader'
import { columns, sorting } from '../../fixtures'

describe('useHeader hook', () => {
  test('Returns headers array', () => {
    const { result } = renderHook(() => useHeader({ columns, sorting }))

    expect(result.current).toHaveLength(9)

    result.current.forEach((header, i) => {
      expect(header.id).toBe(columns[i].id)
      expect(header.displayText).toBe(columns[i].displayText)
      expect(header.isSorted).toBeDefined()
      if (header.id === sorting.id) {
        expect(header.isSorted).toBe(true)
      } else {
        expect(header.isSorted).toBe(false)
      }
      expect(header.sortingDirection).toBe(sorting.direction)
    })
  })
})
