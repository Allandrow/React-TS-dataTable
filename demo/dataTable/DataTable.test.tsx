import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DataTable } from './DataTable'

describe('DataTable', () => {
  test('pageSize changes', () => {
    render(<DataTable />)

    userEvent.selectOptions(screen.getByRole('combobox'), '20')

    expect(screen.getAllByRole('row')).toHaveLength(21)
  })

  test.todo('pagination changes')

  test.todo('search value changes')

  test.todo('sorting changes')

  test.todo('search + sorting changes')
})
