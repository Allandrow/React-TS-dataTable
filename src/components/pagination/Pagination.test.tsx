import { render, screen } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  let callback: (value: number) => void | undefined

  beforeAll(() => {
    callback = (value: number) => console.log(value)
  })

  test('No data displays one disabled page button', () => {
    render(<Pagination callback={callback} dataLength={0} pageSize={10} />)

    expect(screen.getByRole('button', { name: '1' })).toBeDisabled()
  })

  test('Previous button disabled if currentPage is the first', () => {
    render(
      <Pagination callback={callback} dataLength={100} pageSize={10} currentPage={1} />
    )

    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
  })

  test('Next button disabled if currentPage is the last', () => {
    render(
      <Pagination callback={callback} dataLength={100} pageSize={10} currentPage={10} />
    )

    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
  })

  test('Display no ellipsis if page count is less than 8', async () => {
    render(<Pagination callback={callback} dataLength={60} pageSize={10} />)

    expect(screen.queryByText('...')).toBeFalsy()
  })

  test('Displays ellipsis when page count is more than 7', () => {
    render(<Pagination callback={callback} dataLength={80} pageSize={10} />)

    expect(screen.getByRole('button', { name: '...' })).toBeDisabled()
  })
})
