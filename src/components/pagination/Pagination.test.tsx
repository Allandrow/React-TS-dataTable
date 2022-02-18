import { render, screen } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  let changePage: (value: number) => number

  beforeAll(() => {
    changePage = (value: number) => value
  })

  test('Display all pages if total pages is 7 or less', () => {
    render(
      <Pagination changePage={changePage} dataLength={64} pageSize={10} currentPage={1} />
    )

    expect(screen.queryByText('...')).toBeFalsy()
    expect(screen.queryByRole('button', { name: '1' })).toBeFalsy()
    expect(screen.queryByRole('button', { name: '2' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '3' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '4' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '5' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '6' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '7' })).toBeInTheDocument()
  })

  test('No data displays no page and both navigation buttons are disabled', () => {
    render(
      <Pagination changePage={changePage} dataLength={0} pageSize={10} currentPage={1} />
    )

    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
    expect(screen.queryByRole('button', { name: '1' })).toBeFalsy()
    expect(screen.queryByText('1')).toBeFalsy()
  })

  test('Only one page display current page not as a button', () => {
    render(
      <Pagination changePage={changePage} dataLength={8} pageSize={10} currentPage={1} />
    )

    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
    expect(screen.queryByRole('button', { name: '1' })).toBeFalsy()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('Only previous button disabled when current page is the first', () => {
    render(
      <Pagination changePage={changePage} dataLength={68} pageSize={10} currentPage={1} />
    )

    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /next/i })).toBeEnabled()
  })

  test('Only next button disabled when current page is the last', () => {
    render(
      <Pagination changePage={changePage} dataLength={75} pageSize={10} currentPage={8} />
    )

    expect(screen.getByRole('button', { name: /previous/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
  })

  test('Navigation buttons enabled when current Page is not first or last', () => {
    render(
      <Pagination changePage={changePage} dataLength={50} pageSize={10} currentPage={3} />
    )

    expect(screen.getByRole('button', { name: /previous/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /next/i })).toBeEnabled()
  })

  test('Multiple pages with current within first 4, should suspend right', () => {
    render(
      <Pagination changePage={changePage} dataLength={80} pageSize={10} currentPage={3} />
    )

    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '6' })).toBeFalsy()
  })

  test('Multiple pages with current within last 4, should suspend left', () => {
    render(
      <Pagination
        changePage={changePage}
        dataLength={100}
        pageSize={10}
        currentPage={8}
      />
    )

    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '2' })).toBeFalsy()
  })

  test('Multiple pages with current not within first/last 4, should suspend both sides', () => {
    render(
      <Pagination
        changePage={changePage}
        dataLength={100}
        pageSize={10}
        currentPage={6}
      />
    )

    expect(screen.getAllByText('...')).toHaveLength(2)
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '7' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '4' })).toBeFalsy()
    expect(screen.queryByRole('button', { name: '8' })).toBeFalsy()
  })
})
