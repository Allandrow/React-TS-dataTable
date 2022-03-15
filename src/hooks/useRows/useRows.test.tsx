import { renderHook } from '@testing-library/react-hooks'
import { useRows } from './useRows'
import { headers, data, sorting } from '../../fixtures'

describe('useRows hook', () => {
  test('Returns rows array', () => {
    const { result } = renderHook(() => useRows({ data, headers, sorting }))

    expect(result.current).toHaveLength(3)
    expect(result.current[0].data[0].cellValue).toBe('Alayne')
    expect(result.current[0].data[0].key).toBe('firstName-Alayne')
    result.current.forEach(({ data }) => {
      expect(data).toHaveLength(headers.length)

      data.forEach((item, i) => {
        expect(item.key.includes(headers[i].id)).toBe(true)
      })

      const sortedCount = data.reduce(
        (total, { isSorted }) => (isSorted ? total + 1 : total),
        0
      )

      expect(sortedCount).toBe(1)
    })
  })
})
