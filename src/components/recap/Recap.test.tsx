import { render, screen } from '@testing-library/react'

import { Recap } from './Recap'

describe('Recap', () => {
  test('No data shown', () => {
    render(<Recap dataLength={0} />)
    expect(screen.getByText(/showing 0 to 0 of 0 entries/i)).toBeInTheDocument()
  })

  test('Data existing, no filtered data shown', () => {
    render(<Recap dataLength={100} filteredDataLength={0} />)
    expect(
      screen.getByText(/showing 0 to 0 of 0 entries \(filtered from 100 total entries\)/i)
    ).toBeInTheDocument()
  })

  test('Indices shown with last index inferior to data length', () => {
    render(<Recap dataLength={100} pageSize={10} currentPage={2} />)
    expect(screen.getByText(/showing 11 to 20 of 100 entries/i)).toBeInTheDocument()
  })

  test('Indices shown with last index superior to data length', () => {
    render(<Recap dataLength={12} pageSize={20} currentPage={1} />)
    expect(screen.getByText(/showing 1 to 12 of 12 entries/i)).toBeInTheDocument()
  })
})
