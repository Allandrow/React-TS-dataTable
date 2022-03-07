import { renderHook } from '@testing-library/react-hooks'
import { columns } from '../../../demo/fixtures/columns'
import { OptionsList } from '../useTable/useTable'
import { useHeader } from './useHeader'

const features: Partial<OptionsList> = {
  sortBy: { id: 'firstName', direction: 'descending' },
}

describe('useHeader hook', () => {
  test('Returns headers array', () => {
    const { result } = renderHook(() => useHeader({ columns, features }))

    expect(result.current).toHaveLength(9)
    expect(result.current[0].text).toBe('First Name')
    expect(result.current[0].classNames).toHaveLength(2)
    expect(result.current[0].classNames).toContain('sorted')
    expect(result.current[0].classNames).toContain('descending')
    expect(result.current[1].classNames).toHaveLength(0)
  })
})
