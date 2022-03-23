import { renderHook } from '@testing-library/react-hooks'
import { useHeader } from './useHeader'
import { columns, sorting } from '../../fixtures'

describe('useHeader hook', () => {
  test('Returns headers array', () => {
    const { result } = renderHook(() => useHeader({ columns, sorting }))

    expect(result.current).toHaveLength(9)

    result.current.forEach(({ id, displayText, isSorted, sortingDirection }, i) => {
      expect(id).toBe(columns[i].id)
      expect(displayText).toBe(columns[i].displayText)

      if (id === sorting.id) {
        expect(isSorted).toBe(true)
        expect(sortingDirection).toBe(sorting.direction)
      } else {
        expect(isSorted).toBeUndefined()
        expect(sortingDirection).toBeUndefined()
      }
    })
  })
})
