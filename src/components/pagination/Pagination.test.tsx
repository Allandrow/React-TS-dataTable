import { render, screen } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  let callback: (value: number) => number

  beforeAll(() => {
    callback = (value: number) => value
  })

  test('No data displays no page and both navigation buttons are disabled', () => {
    render(<Pagination callback={callback} dataLength={0} pageSize={10} />)

    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
    expect(screen.queryByRole('button', { name: '1' })).toBeFalsy()
  })

  test('Only one page display current page and both navigation buttons are disabled', () => {
    render(
      <Pagination callback={callback} dataLength={8} pageSize={10} currentPage={1} />
    )

    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
    expect(screen.queryByRole('button', { name: '1' })).toBeFalsy()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('Navigation buttons enabled when current Page is not first or last', () => {
    render(
      <Pagination callback={callback} dataLength={50} pageSize={10} currentPage={3} />
    )

    expect(screen.getByRole('button', { name: /previous/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /next/i })).toBeEnabled()
  })

  test('Multiple pages with current within first 4, should suspend right', () => {
    render(
      <Pagination callback={callback} dataLength={80} pageSize={10} currentPage={3} />
    )

    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '6' })).toBeFalsy()
  })

  test('Multiple pages with current within last 4, should suspend left', () => {
    render(
      <Pagination callback={callback} dataLength={100} pageSize={10} currentPage={8} />
    )

    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '2' })).toBeFalsy()
  })

  test('Multiple pages with current not within first/last 4, should suspend both sides', async () => {
    render(
      <Pagination callback={callback} dataLength={100} pageSize={10} currentPage={5} />
    )

    expect(screen.queryAllByText('...')).toHaveLength(2)
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument()
  })
})
