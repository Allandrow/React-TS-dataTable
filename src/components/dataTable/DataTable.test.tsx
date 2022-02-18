import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { employees } from '../../fixtures/employees'
import { headings } from '../../fixtures/headings'
import { DataTable } from './DataTable'

const employeesSample = [
  {
    firstName: 'Lani',
    lastName: 'Beecraft',
    department: 'Business Development',
    dateOfBirth: '2/13/1968',
    startDate: '6/2/2021',
    street: '68382 Grasskamp Park',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98140',
  },
  {
    firstName: 'Analise',
    lastName: 'Verrechia',
    department: 'Research and Development',
    dateOfBirth: '5/27/1997',
    startDate: '7/17/2021',
    street: '397 Thompson Circle',
    city: 'Lynn',
    state: 'MA',
    zipCode: '01905',
  },
  {
    firstName: 'Valentino',
    lastName: 'Rubinovitsch',
    department: 'Human Resources',
    dateOfBirth: '5/1/1990',
    startDate: '6/13/2021',
    street: '29 Caliangt Street',
    city: 'Ogden',
    state: 'UT',
    zipCode: '84403',
  },
]

describe('DataTable', () => {
  test('on load verifies correct initial states', () => {
    render(<DataTable data={employeesSample} headings={headings} />)

    expect(screen.getByRole('combobox')).toHaveValue('10')
    expect(screen.queryByRole('button', { name: '1' })).toBeFalsy()
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()

    // head + 3 items in the body
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(4)
    expect(rows[1]).toHaveTextContent(/analise/i)
    expect(rows[2]).toHaveTextContent(/lani/i)

    expect(screen.getByText(/showing 1 to 3 of 3 entries/i)).toBeInTheDocument()
  })

  describe('Change ordering', () => {
    test('same key, different order', () => {
      render(<DataTable data={employeesSample} headings={headings} />)

      userEvent.click(screen.getByRole('columnheader', { name: /first name/i }))
      const rows = screen.getAllByRole('row')
      expect(rows[3]).toHaveTextContent(/analise/i)
      expect(rows[1]).toHaveTextContent(/valentino/i)
    })

    test('different key, by date', () => {
      render(<DataTable data={employeesSample} headings={headings} />)

      userEvent.click(screen.getByRole('columnheader', { name: /start date/i }))
      const rows = screen.getAllByRole('row')
      expect(rows[1]).toHaveTextContent('6/2/2021')
      expect(rows[3]).toHaveTextContent('7/17/2021')
    })

    test('different key, number', () => {
      render(<DataTable data={employeesSample} headings={headings} />)

      userEvent.click(screen.getByRole('columnheader', { name: /zip code/i }))
      const rows = screen.getAllByRole('row')
      expect(rows[1]).toHaveTextContent('01905')
      expect(rows[3]).toHaveTextContent('98140')
    })
  })

  describe('Filtering', () => {
    test('Filtering only shows matching results if any', () => {
      render(<DataTable data={employeesSample} headings={headings} />)

      userEvent.type(screen.getByRole('searchbox'), 'development')
      expect(screen.getAllByRole('row')).toHaveLength(3)
      expect(screen.queryByText(/Rubinovitsch/i)).toBeFalsy()
      expect(
        screen.getByText(/showing 1 to 2 of 2 entries \(filtered from 3 total entries\)/i)
      ).toBeInTheDocument()
    })

    test('Filtering with no results shows a different display', () => {
      render(<DataTable data={employeesSample} headings={headings} />)
      userEvent.type(screen.getByRole('searchbox'), "won't find any result like this")

      expect(screen.getAllByRole('row')).toHaveLength(2)
      expect(
        screen.getByRole('cell', { name: /No data available in table/i })
      ).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
      expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
      expect(screen.queryByText('1')).toBeFalsy()
      expect(
        screen.getByText(/showing 0 to 0 of 0 entries \(filtered from 3 total entries\)/i)
      ).toBeInTheDocument()
    })

    test('filtering when on other page than first resets current page to 1', () => {
      render(<DataTable data={employees} headings={headings} />)

      userEvent.click(screen.getByRole('button', { name: '3' }))
      userEvent.type(screen.getByRole('searchbox'), 'development')

      expect(screen.queryByText(/no data available in table/i)).toBeFalsy()
      expect(screen.queryByRole('button', { name: '1' })).toBeFalsy()
      expect(screen.queryByRole('button', { name: '3' })).toBeFalsy()
      expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
    })
  })

  describe('Select option change', () => {
    test('Change number of items', () => {
      render(<DataTable data={employees} headings={headings} />)

      userEvent.selectOptions(screen.getByRole('combobox'), '20')
      expect(screen.getAllByRole('row')).toHaveLength(21)
      expect(screen.getByText(/showing 1 to 20 of 99 entries/i)).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: '6' })).toBeFalsy()

      userEvent.selectOptions(screen.getByRole('combobox'), '100')

      expect(screen.getAllByRole('row')).toHaveLength(100)
      expect(screen.getByText(/showing 1 to 99 of 99 entries/i)).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: '1' })).toBeFalsy()
      expect(screen.queryByRole('button', { name: '2' })).toBeFalsy()
    })

    test('When on page after first and page size change, back to page 1', () => {
      render(<DataTable data={employees} headings={headings} />)

      userEvent.click(screen.getByRole('button', { name: '2' }))
      userEvent.selectOptions(screen.getByRole('combobox'), '20')

      expect(screen.queryByRole('button', { name: '1' })).toBeFalsy()
      expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
    })
  })

  describe('Pagination', () => {
    test('pagination change when click a specific page', () => {
      render(<DataTable data={employees} headings={headings} />)

      expect(screen.queryByRole('button', { name: '1' })).toBeFalsy()
      expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()

      userEvent.click(screen.getByRole('button', { name: '5' }))

      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: '2' })).toBeFalsy()
      expect(screen.queryByRole('button', { name: '5' })).toBeFalsy()
      expect(screen.getByText(/showing 41 to 50 of 99 entries/i)).toBeInTheDocument()
    })

    test('pagination change when click previous/next', () => {
      render(<DataTable data={employees} headings={headings} />)

      userEvent.click(screen.getByRole('button', { name: /next/i }))

      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: '2' })).toBeFalsy()
      expect(screen.getByText(/showing 11 to 20 of 99 entries/i)).toBeInTheDocument()

      userEvent.click(screen.getByRole('button', { name: /previous/i }))

      expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: '1' })).toBeFalsy()
      expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
      expect(screen.getByText(/showing 1 to 10 of 99 entries/i)).toBeInTheDocument()
    })
  })
})
