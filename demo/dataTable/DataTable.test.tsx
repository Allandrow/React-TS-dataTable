import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DataTable } from './DataTable'
import { columns, data } from '../fixtures'

describe('DataTable', () => {
  test('no data', () => {
    render(<DataTable columns={columns} data={[]} />)

    expect(screen.getByText(/no data available/i)).toBeInTheDocument()
  })

  test('no filtered data', () => {
    render(<DataTable columns={columns} data={data} />)

    userEvent.type(screen.getByRole('searchbox'), 'filter that will not find any match')

    expect(screen.getByText(/no matching records/i)).toBeInTheDocument()
  })

  test('pageSize changes', () => {
    render(<DataTable columns={columns} data={data} />)
    userEvent.click(screen.getByRole('button', { name: '2' }))
    userEvent.selectOptions(screen.getByRole('combobox'), '20')

    expect(screen.getAllByRole('row')).toHaveLength(21)
    expect(screen.getAllByRole('listitem')).toHaveLength(7)
    expect(screen.getByText(/showing 1 to 20 of 99 entries/i)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '1' })).toBeNull()
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
  })

  test('pagination changes', () => {
    render(<DataTable columns={columns} data={data} />)

    userEvent.click(screen.getByRole('button', { name: '10' }))

    expect(screen.getAllByRole('row')).toHaveLength(10)
    expect(screen.getByText(/zaria/i)).toBeInTheDocument()
    expect(screen.getByText(/showing 91 to 99 of 99 entries/i)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '10' })).toBeNull()
  })

  test('search value changes', () => {
    render(<DataTable columns={columns} data={data} />)

    userEvent.type(screen.getByRole('searchbox'), 'support')

    expect(screen.getAllByRole('row')).toHaveLength(8)
    expect(screen.getByText(/windham/i)).toBeInTheDocument()
    expect(
      screen.getByText('Showing 1 to 7 of 7 entries (filtered from 99 total entries)')
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  test('sorting changes', () => {
    render(<DataTable columns={columns} data={data} />)

    userEvent.click(screen.getByRole('button', { name: '2' }))
    expect(screen.queryByText(/zaria/i)).toBeNull()
    userEvent.click(screen.getByRole('columnheader', { name: /first name/i }))
    expect(screen.getByText(/zaria/i)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '1' })).toBeNull()
  })
})
